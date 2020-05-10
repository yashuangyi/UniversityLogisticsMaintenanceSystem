// Copyright (c) PlaceholderCompany. All rights reserved.

using System.Web.Mvc;
using Business.BLL;

namespace UI.Controllers
{
    /// <summary>
    /// 登录界面的控制器.
    /// </summary>
    public class LoginController : LoginBLL
    {
        /// <summary>
        /// 进入后台登录界面.
        /// </summary>
        /// <returns>后台登录界面.</returns>
        public ActionResult Login()
        {
            return View();
        }
    }
}