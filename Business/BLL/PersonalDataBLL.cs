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
    /// 个人信息控制器.
    /// </summary>
    public class PersonalDataBLL : Controller
    {
        private static readonly SqlSugarClient Db = DataBase.CreateClient();

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
        /// 修改信息.
        /// </summary>
        /// <param name="user">用户.</param>
        /// <returns>Json.</returns>
        public ActionResult EditUser(User user)
        {
            Db.Updateable(user).ExecuteCommand();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 初始化信息.
        /// </summary>
        /// <param name="userId">用户ID.</param>
        /// <returns>Json.</returns>
        public ActionResult GetMyData(int userId)
        {
            var user = Db.Queryable<User>().Where(it => it.Id == userId).Single();
            Object data = new
            {
                id = user.Id,
                name = user.Name,
                password = user.Password,
                account = user.Account,
                photoPath = user.PhotoPath,
            };
            return Json(new { code = 200, data}, JsonRequestBehavior.AllowGet);
        }
    }
}