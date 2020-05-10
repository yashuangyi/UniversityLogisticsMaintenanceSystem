
using System.Web.Mvc;
using Business.BLL;

namespace UI.Controllers
{
    /// <summary>
    /// 用户管理控制器.
    /// </summary>
    public class UserManageController : UserManageBLL
    {
        /// <summary>
        /// 返回用户管理界面.
        /// </summary>
        /// <returns>用户管理界面.</returns>
        public ActionResult UserManage()
        {
            return View();
        }
    }
}