
using System.Web.Mvc;
using Business.BLL;

namespace UI.Controllers
{
    /// <summary>
    /// 主页控制器.
    /// </summary>
    public class HomeController : HomeBLL
    {
        /// <summary>
        /// 返回主页界面.
        /// </summary>
        /// <returns>主页界面.</returns>
        public ActionResult Home()
        {
            ViewBag.UserId = Session["userId"];
            return View();
        }

        /// <summary>
        /// 返回首页界面.
        /// </summary>
        /// <returns>首页界面.</returns>
        public ActionResult HomePage()
        {
            return View();
        }
    }
}