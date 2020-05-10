using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SqlSugar;
using Model.Models;
using DataAccess.DB;

namespace Business.BLL
{
    /// <summary>
    /// 用户管理控制器.
    /// </summary>
    public class UserManageBLL : Controller
    {
        private static readonly SqlSugarClient Db = DataBase.CreateClient();

        /// <summary>
        /// 获取用户列表.
        /// </summary>
        /// <param name="page">总页数.</param>
        /// <param name="limit">一页多少行数据.</param>
        /// <param name="userPower">用户权限.</param>
        /// <param name="search">查询字段.</param>
        /// <returns>管理员列表.</returns>
        public ActionResult GetUser(int page, int limit, string userPower = null, string search = null)
        {
            List<User> list = null;
            int count;
            // 分页操作，Skip()跳过前面数据项
            if (userPower == "超级管理员")
            { 
                if (search == null)
                {
                    // 分页操作，Skip()跳过前面数据项
                    count = Db.Queryable<User>().Count();
                    list = Db.Queryable<User>().Skip((page - 1) * limit).Take(limit).ToList();
                }
                else
                {
                    count = Db.Queryable<User>().Where(it => it.Account.Contains(search) || it.Name.Contains(search) || it.Id.ToString().Contains(search)).Count();
                    list = Db.Queryable<User>().Where(it => it.Account.Contains(search) || it.Name.Contains(search) || it.Id.ToString().Contains(search)).Skip((page - 1) * limit).Take(limit).ToList();
                }
            }
            else
            {
                if (search == null)
                {
                    // 分页操作，Skip()跳过前面数据项
                    count = Db.Queryable<User>().Where(it => it.Power != "超级管理员" && it.Power != "管理员").Count();
                    list = Db.Queryable<User>().Where(it => it.Power != "超级管理员" && it.Power != "管理员").Skip((page - 1) * limit).Take(limit).ToList();
                }
                else
                {
                    count = Db.Queryable<User>().Where(it => it.Power != "超级管理员" && it.Power != "管理员" && (it.Account.Contains(search) || it.Name.Contains(search) || it.Id.ToString().Contains(search))).Count();
                    list = Db.Queryable<User>().Where(it => it.Power != "超级管理员" && it.Power != "管理员" && (it.Account.Contains(search) || it.Name.Contains(search) || it.Id.ToString().Contains(search))).Skip((page - 1) * limit).Take(limit).ToList();
                }
            }

            // 参数必须一一对应，JsonRequestBehavior.AllowGet一定要加，表单要求code返回0
            return Json(new { code = 0, msg = string.Empty, count, data = list }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 上传图片.
        /// </summary>
        /// <returns>Json.</returns>
        public ActionResult UploadPic()
        {
            string photoPath = string.Empty;
            string photoName = string.Empty;
            string msg = string.Empty;
            HttpPostedFileWrapper file = (HttpPostedFileWrapper)Request.Files[0];
            photoName = file.FileName;
            if (string.IsNullOrEmpty(photoName))
            {
                msg = "无效文件，请重新上传！";
                return Json(new { photoPath, msg, code = 400, photoName = string.Empty }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                // 获得当前时间的string类型
                string name = DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss");
                string path = "/Source/headPhoto/";
                string uploadPath = Server.MapPath("~/" + path);
                string ext = Path.GetExtension(photoName);
                string savePath = uploadPath + name + ext;
                file.SaveAs(savePath);
                photoPath = path + name + ext;
                msg = "上传成功！";
                return Json(new { photoPath, msg, code = 200, photoName }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 新建用户账户.
        /// </summary>
        /// /// <param name="user">传入数据.</param>
        /// <returns>Json.</returns>
        public ActionResult AddUser(User user)
        {
            var isExist = Db.Queryable<User>().Where(it => it.Account == user.Account).Single();
            if (isExist != null)
            {
                return Json(new { code = 402 }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                // 自增列用法
                int userId = Db.Insertable(user).ExecuteReturnIdentity();
                user.Id = userId;
                Db.Updateable(user).ExecuteCommand();
                return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 修改用户.
        /// </summary>
        /// <param name="user">用户.</param>
        /// <returns>Json.</returns>
        public ActionResult EditUser(User user)
        {
            Db.Updateable(user).ExecuteCommand();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 删除账户.
        /// </summary>
        /// <param name="userId">账户编号.</param>
        /// <returns>Json.</returns>
        public ActionResult DelUser(int userId)
        {
            Db.Deleteable<User>().Where(it => it.Id == userId).ExecuteCommand();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }
    }
}