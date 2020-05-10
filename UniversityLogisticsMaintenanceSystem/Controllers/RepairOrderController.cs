
using System.Web.Mvc;
using Business.BLL;

namespace UI.Controllers
{
    /// <summary>
    /// 维修单管理iframe的控制器.
    /// </summary>
    public class RepairOrderController : RepairOrderBLL
    {
        /// <summary>
        /// 返回维修单界面.
        /// </summary>维修单界面.</returns>
        public ActionResult RepairOrder()
        {
            return View();
        }
    }
}