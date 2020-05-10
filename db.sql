/*
 Navicat Premium Data Transfer

 Source Server         : sqlserver
 Source Server Type    : SQL Server
 Source Server Version : 13004001
 Source Host           : (localdb)\MSSQLLocalDB:1433
 Source Catalog        : UniversityLogisticsMaintenanceSystem
 Source Schema         : dbo

 Target Server Type    : SQL Server
 Target Server Version : 13004001
 File Encoding         : 65001

 Date: 10/05/2020 12:17:09
*/


-- ----------------------------
-- Table structure for repairOrder
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[repairOrder]') AND type IN ('U'))
	DROP TABLE [dbo].[repairOrder]
GO

CREATE TABLE [dbo].[repairOrder] (
  [id] int  IDENTITY(1,1) NOT NULL,
  [maintainerId] int  NULL,
  [userId] int  NULL,
  [damagedName] nvarchar(max) COLLATE Chinese_PRC_90_CI_AS  NULL,
  [address] nvarchar(max) COLLATE Chinese_PRC_90_CI_AS  NULL,
  [contact] nvarchar(max) COLLATE Chinese_PRC_90_CI_AS  NULL,
  [reserveTime] datetime  NULL,
  [remark] nvarchar(max) COLLATE Chinese_PRC_90_CI_AS  NULL,
  [appraise] nvarchar(max) COLLATE Chinese_PRC_90_CI_AS  NULL,
  [status] nvarchar(max) COLLATE Chinese_PRC_90_CI_AS  NULL,
  [createTime] datetime  NULL
)
GO

ALTER TABLE [dbo].[repairOrder] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of [repairOrder]
-- ----------------------------
BEGIN TRANSACTION
GO

SET IDENTITY_INSERT [dbo].[repairOrder] ON
GO

INSERT INTO [dbo].[repairOrder] ([id], [maintainerId], [userId], [damagedName], [address], [contact], [reserveTime], [remark], [appraise], [status], [createTime]) VALUES (N'2', N'2', N'3', N'水龙头坏了', N'天刀门', N'110', N'2020-04-05 18:04:00.000', NULL, NULL, N'已完成', N'2020-04-05 22:45:32.000'), (N'3', N'6', N'3', N'电脑坏了', N'丐帮', N'886', N'2020-04-15 13:00:00.000', N'加急加急', NULL, N'进行中', N'2020-04-05 22:46:44.000'), (N'4', N'2', N'8', N'd', N'1112', N'1123213', N'2020-04-22 00:18:00.000', NULL, N'good', N'已完成', N'2020-04-06 00:32:12.000'), (N'1005', N'2', N'1', N'1', N'2', N'12312', N'2020-04-05 00:12:42.000', N'8', N'加鸡腿', N'已完成', N'2020-04-05 00:12:47.000')
GO

SET IDENTITY_INSERT [dbo].[repairOrder] OFF
GO

COMMIT
GO


-- ----------------------------
-- Table structure for user
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[user]') AND type IN ('U'))
	DROP TABLE [dbo].[user]
GO

CREATE TABLE [dbo].[user] (
  [id] int  IDENTITY(1,1) NOT NULL,
  [account] nvarchar(max) COLLATE Chinese_PRC_90_CI_AS  NULL,
  [password] nvarchar(max) COLLATE Chinese_PRC_90_CI_AS  NULL,
  [name] nvarchar(max) COLLATE Chinese_PRC_90_CI_AS  NULL,
  [photoPath] nvarchar(max) COLLATE Chinese_PRC_90_CI_AS  NULL,
  [power] nvarchar(max) COLLATE Chinese_PRC_90_CI_AS  NULL
)
GO

ALTER TABLE [dbo].[user] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of [user]
-- ----------------------------
BEGIN TRANSACTION
GO

SET IDENTITY_INSERT [dbo].[user] ON
GO

INSERT INTO [dbo].[user] ([id], [account], [password], [name], [photoPath], [power]) VALUES (N'1', N'admin', N'123456', N'帅哥', N'/Source/headPhoto/2020-04-05-22-17-33.png', N'超级管理员'), (N'2', N'test', N'123456', N'维修工', NULL, N'维修人员'), (N'3', N'student', N'123456', N'学生2', NULL, N'学生'), (N'5', N'guanliyuan', N'123456', N'管理员', N'/Source/headPhoto/2020-04-05-22-48-36.png', N'管理员'), (N'6', N'weixiu', N'123456', N'superman', NULL, N'维修人员'), (N'7', N'test1', N'123456', N'好学生', NULL, N'学生'), (N'8', N'111', N'111', N'qqq', NULL, N'学生')
GO

SET IDENTITY_INSERT [dbo].[user] OFF
GO

COMMIT
GO


-- ----------------------------
-- Primary Key structure for table repairOrder
-- ----------------------------
ALTER TABLE [dbo].[repairOrder] ADD CONSTRAINT [PK__tmp_ms_x__3213E83FF9E6B65C] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Primary Key structure for table user
-- ----------------------------
ALTER TABLE [dbo].[user] ADD CONSTRAINT [PK__tmp_ms_x__3213E83F970B462D] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO

