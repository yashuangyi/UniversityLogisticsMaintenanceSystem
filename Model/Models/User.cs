using SqlSugar;

namespace Model.Models
{
    /// <summary>
    /// 登录实体类.
    /// </summary>
    [SugarTable("user")]
    public partial class User
    {
        // 指定主键和自增列

        /// <summary>
        /// Gets or sets 编号.
        /// </summary>
        [SugarColumn(IsPrimaryKey = true, IsIdentity = true)]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets 账号.
        /// </summary>
        public string Account { get; set; }

        /// <summary>
        /// Gets or sets 密码.
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        /// Gets or sets 名字.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets 权限（超级管理员，管理员，学生，维修人员）.
        /// </summary>
        public string Power { get; set; }

        /// <summary>
        /// Gets or sets 头像路径.
        /// </summary>
        public string PhotoPath { get; set; }
    }
}