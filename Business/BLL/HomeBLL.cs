using SqlSugar;
using System.Web.Mvc;
using Model.Models;
using DataAccess.DB;
using System.Collections.Generic;
using System.Linq;

namespace Business.BLL
{
    /// <summary>
    /// 主页.
    /// </summary>
    public class HomeBLL : Controller
    {
        private static readonly SqlSugarClient Db = DataBase.CreateClient();

        /// <summary>
        /// echarts对象.
        /// </summary>
        public class Echarts
        {
            /// <summary>
            /// Gets or sets 值.
            /// </summary>
            public int value { get; set; }

            /// <summary>
            /// Gets or sets 名称.
            /// </summary>
            public string name { get; set; }
        }

        /// <summary>
        /// 初始化数据.
        /// </summary>
        /// <param name="userId">用户Id.</param>
        /// <returns>json.</returns>
        public ActionResult ReadState(int userId)
        {
            var login = Db.Queryable<User>().Where(it => it.Id == userId).Single();
            if (login != null)
            {
                var userName = login.Name;
                var userPhoto = login.PhotoPath;
                var userPower = login.Power;
                return Json(new { code = 200, userName, userPhoto, userPower }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { code = 404 }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 获取管理员echarts所需信息.
        /// </summary>
        /// <returns>Json.</returns>
        public ActionResult GetEchartsOne()
        {
            var orderOne = Db.Queryable<RepairOrder>().Where(it => it.Status == "已完成").Count();
            var orderTwo = Db.Queryable<RepairOrder>().Where(it => it.Status == "进行中").Count();
            var orderThree = Db.Queryable<RepairOrder>().Where(it => it.Status == "待分配").Count();
            List<Echarts> list = new List<Echarts>();
            Echarts one = new Echarts
            {
                value = orderOne,
                name = "已完成",
            };
            Echarts two = new Echarts
            {
                value = orderTwo,
                name = "进行中",
            };
            Echarts three = new Echarts
            {
                value = orderThree,
                name = "待分配",
            };

            list.Add(one);
            list.Add(two);
            list.Add(three);
            return Json(new { code = 200, data = list, count = list.Count() }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 获取维修人员echarts所需信息.
        /// </summary>
        /// <param name="userId">用户Id.</param>
        /// <returns>Json.</returns>
        public ActionResult GetEchartsTwo(int userId)
        {
            var orderOne = Db.Queryable<RepairOrder>().Where(it => it.Status == "已完成" && it.MaintainerId == userId).Count();
            var orderTwo = Db.Queryable<RepairOrder>().Where(it => it.Status == "进行中" && it.MaintainerId == userId).Count();
            List<Echarts> list = new List<Echarts>();
            Echarts one = new Echarts
            {
                value = orderOne,
                name = "已完成",
            };
            Echarts two = new Echarts
            {
                value = orderTwo,
                name = "进行中",
            };

            list.Add(one);
            list.Add(two);
            return Json(new { code = 200, data = list, count = list.Count() }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 获取学生echarts所需信息.
        /// </summary>
        /// <param name="userId">用户Id.</param>
        /// <returns>Json.</returns>
        public ActionResult GetEchartsThree(int userId)
        {
            var orderOne = Db.Queryable<RepairOrder>().Where(it => it.Status == "已完成" && it.UserId == userId).Count();
            var orderTwo = Db.Queryable<RepairOrder>().Where(it => it.Status == "进行中" && it.UserId == userId).Count();
            var orderThree = Db.Queryable<RepairOrder>().Where(it => it.Status == "待分配" && it.UserId == userId).Count();
            List<Echarts> list = new List<Echarts>();
            Echarts one = new Echarts
            {
                value = orderOne,
                name = "已完成",
            };
            Echarts two = new Echarts
            {
                value = orderTwo,
                name = "进行中",
            };
            Echarts three = new Echarts
            {
                value = orderThree,
                name = "待分配",
            };

            list.Add(one);
            list.Add(two);
            list.Add(three);
            return Json(new { code = 200, data = list, count = list.Count() }, JsonRequestBehavior.AllowGet);
        }
    }
}