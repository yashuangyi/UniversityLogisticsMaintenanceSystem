
using System.Web.Mvc;
using Business.BLL;

namespace UI.Controllers
{
    /// <summary>
    /// 故障登记iframe的控制器.
    /// </summary>
    public class MyRepairController : MyRepairBLL
    {
        /// <summary>
        /// 返回我的报修界面.
        /// </summary>我的报修界面.</returns>
        public ActionResult MyRepair()
        {
            return View();
        }
    }
}