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
    /// 维修单管理iframe的控制器.
    /// </summary>
    public class RepairOrderBLL : Controller
    {
        private static readonly SqlSugarClient Db = DataBase.CreateClient();

        /// <summary>
        /// 获取维修单列表.
        /// </summary>
        /// <param name="page">总页数.</param>
        /// <param name="limit">一页多少行数据.</param>
        /// <param name="search">查询字段.</param>
        /// <returns>维修单列表.</returns>
        public ActionResult GetRepair(int page, int limit, string search = null)
        {
            List<RepairOrder> list = null;
            int count;
            if (search == null)
            {
                // 分页操作，Skip()跳过前面数据项
                count = Db.Queryable<RepairOrder>().Count();
                list = Db.Queryable<RepairOrder>().Skip((page - 1) * limit).Take(limit).ToList();
            }
            else
            {
                count = Db.Queryable<RepairOrder>().Where(it => (it.Address.Contains(search) || it.DamagedName.Contains(search) || it.Contact.Contains(search) || it.CreateTime.Contains(search) || it.ReserveTime.Contains(search))).Count();
                list = Db.Queryable<RepairOrder>().Where(it => (it.Address.Contains(search) || it.DamagedName.Contains(search) || it.Contact.Contains(search) || it.CreateTime.Contains(search) || it.ReserveTime.Contains(search))).Skip((page - 1) * limit).Take(limit).ToList();
            }

            // 参数必须一一对应，JsonRequestBehavior.AllowGet一定要加，表单要求code返回0
            return Json(new { code = 0, msg = string.Empty, count, data = list }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 加载下拉框.
        /// </summary>
        /// <returns>下拉框元素列表.</returns>
        public ActionResult ShowChoice()
        {
            List<User> all = Db.Queryable<User>().Where(it => it.Power == "维修人员").ToList();
            List<string> choice = new List<string>();
            foreach (User user in all)
            {
                choice.Add(user.Id + " " + user.Name);
            }

            return Json(new { code = 200, choice }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 派遣维修单.
        /// </summary>
        /// <param name="manInform">维修人员信息.</param>
        /// <param name="orderId">维修单编号.</param>
        /// <returns>JSON.</returns>
        public ActionResult SendOrder(string manInform, int orderId)
        {
            string[] inform = manInform.Split(' ');
            int manId = int.Parse(inform[0]);
            var order = Db.Queryable<RepairOrder>().Where(it => it.Id == orderId).Single();
            order.MaintainerId = manId;
            order.Status = "进行中";
            Db.Updateable(order).ExecuteCommand();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 完成维修单.
        /// </summary>
        /// <param name="orderId">维修单编号.</param>
        /// <returns>JSON.</returns>
        public ActionResult FinishOrder(int orderId)
        {
            var order = Db.Queryable<RepairOrder>().Where(it => it.Id == orderId).Single();
            order.Status = "已完成";
            Db.Updateable(order).ExecuteCommand();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }
    }
}