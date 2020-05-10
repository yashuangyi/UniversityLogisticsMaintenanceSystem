using SqlSugar;

namespace Model.Models
{
    /// <summary>
    /// 维修单实体类.
    /// </summary>
    [SugarTable("repairOrder")]
    public partial class RepairOrder
    {
        // 指定主键和自增列

        /// <summary>
        /// Gets or sets 订单编号.
        /// </summary>
        [SugarColumn(IsPrimaryKey = true, IsIdentity = true)]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets 维修工编号.
        /// </summary>
        public int? MaintainerId { get; set; }

        /// <summary>
        /// Gets or sets 报修者编号.
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// Gets or sets 损坏物体名.
        /// </summary>
        public string DamagedName { get; set; }

        /// <summary>
        /// Gets or sets 地址.
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// Gets or sets 联系方式.
        /// </summary>
        public string Contact { get; set; }

        /// <summary>
        /// Gets or sets 预约时间.
        /// </summary>
        public string ReserveTime { get; set; }

        /// <summary>
        /// Gets or sets 创建时间.
        /// </summary>
        public string CreateTime { get; set; }

        /// <summary>
        /// Gets or sets 备注.
        /// </summary>
        public string Remark { get; set; }

        /// <summary>
        /// Gets or sets 评价.
        /// </summary>
        public string Appraise { get; set; }

        /// <summary>
        /// Gets or sets 状态（待分配，进行中，已完成，已撤销）.
        /// </summary>
        public string Status { get; set; }
    }
}