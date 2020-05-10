
using System.Web.Mvc;
using Business.BLL;

namespace UI.Controllers
{
    /// <summary>
    /// 个人信息控制器.
    /// </summary>
    public class PersonalDataController : PersonalDataBLL
    {
        /// <summary>
        /// 返回个人信息界面.
        /// </summary>
        /// <returns>个人信息界面.</returns>
        public ActionResult PersonalData()
        {
            return View();
        }
    }
}