/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  usernameOrEmail: string;
  attemptedPassword: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  permissions: string;
  username: string;
  // roles: RoleInfo[];
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  // roles: RoleInfo[];
  // 用户id
  user_id: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName?: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
  // 权限点
  permissions: string[];
  email: string;
}
