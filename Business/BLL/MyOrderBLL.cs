using System;
using System.Collections.Generic;
using System.Web.Mvc;
using SqlSugar;
using Model.Models;
using DataAccess.DB;
using System.Linq;

namespace Business.BLL
{
    /// <summary>
    /// 维修人员工单iframe的控制器.
    /// </summary>
    public class MyOrderBLL : Controller
    {
        private static readonly SqlSugarClient Db = DataBase.CreateClient();

        /// <summary>
        /// 获取工单列表.
        /// </summary>
        /// <param name="page">总页数.</param>
        /// <param name="limit">一页多少行数据.</param>
        /// <param name="userId">用户Id.</param>
        /// <param name="search">查询字段.</param>
        /// <returns>工单列表.</returns>
        public ActionResult GetOrder(int page, int limit, string userId, string search)
        {
            List<RepairOrder> list = null;
            int count;
            if (search == null)
            {
                // 分页操作，Skip()跳过前面数据项
                count = Db.Queryable<RepairOrder>().Where(it => it.MaintainerId == int.Parse(userId)).Count();
                list = Db.Queryable<RepairOrder>().Where(it => it.MaintainerId == int.Parse(userId)).Skip((page - 1) * limit).Take(limit).ToList();
            }
            else
            {
                count = Db.Queryable<RepairOrder>().Where(it => it.MaintainerId == int.Parse(userId) && (it.Address.Contains(search) || it.Contact.Contains(search) || it.DamagedName.Contains(search) || it.ReserveTime.Contains(search))).Count();
                list = Db.Queryable<RepairOrder>().Where(it => it.MaintainerId == int.Parse(userId) && (it.Address.Contains(search) || it.Contact.Contains(search) || it.DamagedName.Contains(search) || it.ReserveTime.Contains(search))).Skip((page - 1) * limit).Take(limit).ToList();
            }

            // 参数必须一一对应，JsonRequestBehavior.AllowGet一定要加，表单要求code返回0
            return Json(new { code = 0, msg = string.Empty, count, data = list }, JsonRequestBehavior.AllowGet);
        }
    }
}