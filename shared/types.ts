/*
 * @Author       : 张天昊
 * @Date         : 2026-02-04 14:08:16
 * @LastEditTime : 2026-02-04 16:35:00
 * @LastEditors  : 张天昊
 * @Description  :
 * @FilePath     : /frontend-nuxt-startkit/shared/types.ts
 */
type Status = 0 | 1 // 离线 | 在线

/**
 * 账密
 */
export interface AccessAccount {
  /**
   * 用户名
   */
  username: string
  /**
   * 密码
   */
  password: string
  /**
   * 描述
   */
  description?: string
}

/**
 * 网络端口配置
 */
export interface NetworkInterface {
  /**
   * 唯一标识
   */
  id: string
  /**
   * IP地址
   */
  ip: string
  /**
   * 协议
   */
  protocol: string
  /**
   * 端口
   */
  port: string
  /**
   * 状态
   */
  status: Status
  /**
   * 访问账号
   */
  accessAccounts?: AccessAccount[]
  /**
   * 描述
   */
  description?: string
}

/**
 * 底座
 */
export interface BaseDock {
  /**
   * 唯一标识
   */
  id: string
  /**
   * 名称
   */
  name: string
  /**
   * 物理位置
   */
  location: string
  /**
   * 状态
   */
  status: Status
  /**
   * 更新时间
   */
  updateAt: Date
  /**
   * 创建时间
   */
  createAt: Date
  /**
   * 创建者
   */
  creator: string
  /**
   * 型号
   */
  model?: string
  /**
   * 序列号
   */
  sn?: string
  /**
   * 授权过期时间
   */
  licenseExpiredAt?: Date
  /**
   * 技术规格
   */
  specifications?: string
  /**
   * 网络端口
   */
  networkInterfaces?: NetworkInterface[]
  /**
   * 描述
   */
  description?: string
}
/**
 * 平台类型
 */
export type PlatformType = 'vm' | 'container' | 'k8s' | 'mix' // 虚拟机 ｜ 容器 ｜ k8s ｜ 混合

/**
 * 平台
 */
export interface Platform {
  /**
   * 唯一标识
   */
  id: string
  /**
   * 名称
   */
  name: string
  /**
   * 类型
   */
  type: PlatformType

  status: Status
  /**
   * 更新时间
   */
  updateAt: Date
  /**
   * 创建时间
   */
  createAt: Date
  /**
   * 创建者
   */
  creator: string
  /**
   * 操作系统
   * 指定操作系统和版本，例如CentOS-7.9，Ubuntu-20.04，Windows Server-10等
   */
  os: string
  /**
   * 运行基座
   * 一个平台可能由多个基座支撑
   */
  baseDocks: Array<Platform['id']>
  /**
   * 子平台
   * 一个平台可能由多个子平台组成
   */
  subPlatforms?: Array<Platform['id']>
  /**
   * 网络端口
   */
  networkInterfaces?: NetworkInterface[]
  /**
   * 描述
   */
  description?: string
}

export type ApplicationType = 'biz' | 'infrastructure' // 业务应用 ｜ 基础设施应用

/**
 * 应用
 */
export interface Application {
  /**
   * 唯一标识
   */
  id: string
  /**
   * 名称
   */
  name: string
  /**
   * 类型
   */
  type: ApplicationType
  /**
   * 状态
   */
  status: Status
  /**
   * 平台
   */
  platform: Platform['id']

  /**
   * 服务列表
   */
  services: ApplicationService[]
  /**
   * 更新时间
   */
  updateAt: Date
  /**
   * 创建时间
   */
  createAt: Date
  /**
   * 创建者
   */
  creator: string
  /**
   * 负责人
   */
  manager: string
  /**
   * 描述
   */
  description?: string
}

/**
 * 应用服务（底层应用程序资源）
 * 例如：mysql-8.0，nginx-1.21.6，nodejs-20.12.0等
 * 通过 bindings 挂载到一个或多个平台网络端口上
 */
export interface ApplicationService {
  /**
   * 唯一标识
   */
  id: string
  /**
   * 名称
   * 应用所需要服务的名称+版本，例如mysql-8.0，nginx-1.21.6，nodejs-20.12.0等
   */
  name: string
  /**
   * 绑定的平台网络端口列表
   */
  bindings?: Array<NetworkInterface['id']>
  /**
   * 描述
   */
  description?: string
}
