
using System.Web.Mvc;
using Business.BLL;

namespace UI.Controllers
{
    /// <summary>
    /// 维修人员工单iframe的控制器.
    /// </summary>
    public class MyOrderController : MyOrderBLL
    {
        /// <summary>
        /// 返回工单界面.
        /// </summary>工单界面.</returns>
        public ActionResult MyOrder()
        {
            return View();
        }
    }
}