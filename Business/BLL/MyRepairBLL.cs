using System;
using System.Collections.Generic;
using System.Web.Mvc;
using SqlSugar;
using DataAccess.DB;
using Model.Models;
using System.Linq;

namespace Business.BLL
{
    /// <summary>
    /// 故障登记iframe的控制器.
    /// </summary>
    public class MyRepairBLL : Controller
    {
        private static readonly SqlSugarClient Db = DataBase.CreateClient();

        /// <summary>
        /// 获取我的报修列表.
        /// </summary>
        /// <param name="page">总页数.</param>
        /// <param name="limit">一页多少行数据.</param>
        /// <param name="userId">用户Id.</param>
        /// <param name="search">查询字段.</param>
        /// <returns>我的报修列表.</returns>
        public ActionResult GetMyRepair(int page, int limit, string userId = null, string search = null)
        {
            List<RepairOrder> list = null;
            int count;
            if (search == null)
            {
                // 分页操作，Skip()跳过前面数据项
                count = Db.Queryable<RepairOrder>().Where(it => it.UserId == int.Parse(userId)).Count();
                list = Db.Queryable<RepairOrder>().Where(it => it.UserId == int.Parse(userId)).Skip((page - 1) * limit).Take(limit).ToList();
            }
            else
            {
                count = Db.Queryable<RepairOrder>().Where(it => it.UserId == int.Parse(userId) && (it.DamagedName.Contains(search) || it.CreateTime.Contains(search) || it.ReserveTime.Contains(search))).Count();
                list = Db.Queryable<RepairOrder>().Where(it => it.UserId == int.Parse(userId) && (it.DamagedName.Contains(search) || it.CreateTime.Contains(search) || it.ReserveTime.Contains(search))).Skip((page - 1) * limit).Take(limit).ToList();
            }

            // 参数必须一一对应，JsonRequestBehavior.AllowGet一定要加，表单要求code返回0
            return Json(new { code = 0, msg = string.Empty, count, data = list }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 新建报修.
        /// </summary>
        /// /// <param name="order">传入数据.</param>
        /// <returns>Json.</returns>
        public ActionResult AddRepair(RepairOrder order)
        {
            // 自增列用法
            int orderId = Db.Insertable(order).ExecuteReturnIdentity();
            order.Id = orderId;
            order.CreateTime = DateTime.Now.ToString();
            Db.Updateable(order).ExecuteCommand();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 修改报修单.
        /// </summary>
        /// <param name="order">报修单.</param>
        /// <returns>Json.</returns>
        public ActionResult EditRepair(RepairOrder order)
        {
            Db.Updateable(order).ExecuteCommand();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 提交评价.
        /// </summary>
        /// <param name="orderId">报修单单号.</param>
        /// <param name="appraise">评价.</param>
        /// <returns>Json.</returns>
        public ActionResult SubmitAppraise(int orderId, string appraise)
        {
            var order = Db.Queryable<RepairOrder>().Where(it => it.Id == orderId).Single();
            order.Appraise = appraise;
            Db.Updateable(order).ExecuteCommand();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 撤销报修.
        /// </summary>
        /// <param name="repairId">单号.</param>
        /// <returns>Json.</returns>
        public ActionResult DelRepair(int repairId)
        {
            Db.Deleteable<RepairOrder>().Where(it => it.Id == repairId).ExecuteCommand();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }
    }
}