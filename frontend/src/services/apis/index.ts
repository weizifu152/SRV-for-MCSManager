import { useDefineApi } from "./base";

// 面板信息
export const overviewInfo = useDefineApi<{}, IPanelOverviewResponse>({
  url: "/api/service/overview",
  method: "GET"
});

// 保存设置
export const saveSettings = useDefineApi<
  {
    data: {
      key: string;
      value: any;
    };
  },
  any
>({
  url: "/api/service/settings",
  method: "POST"
});

// 节点相关
export const editNode = useDefineApi<
  {
    params: {
      uuid: string;
    };
    data: {
      apiKey?: string;
      ip?: string;
      port?: number;
      remarks?: string;
      setting?: any;
      enableSRV?: boolean;
    };
  },
  any
>({
  url: "/api/service/remote_service",
  method: "PUT"
});

export const addNode = useDefineApi<
  {
    data: {
      ip: string;
      port: number;
      remarks: string;
      apiKey: string;
      enableSRV?: boolean;
    };
  },
  any
>({
  url: "/api/service/remote_service",
  method: "POST"
});

export const deleteNode = useDefineApi<
  {
    params: {
      uuid: string;
    };
  },
  any
>({
  url: "/api/service/remote_service",
  method: "DELETE"
});

export const connectNode = useDefineApi<
  {
    params: {
      uuid: string;
    };
  },
  any
>({
  url: "/api/service/remote_service/connect",
  method: "GET"
});

// 实例相关
export const getInstances = useDefineApi<
  {
    params: {
      daemonUuid: string;
    };
  },
  IPanelInstanceInfo[]
>({
  url: "/api/instance/list",
  method: "GET"
});

export const getInstanceDetail = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
  },
  IPanelInstanceInfo
>({
  url: "/api/instance/detail",
  method: "GET"
});

export const createInstance = useDefineApi<
  {
    data: {
      daemonUuid: string;
      config: any;
      quickStart?: boolean;
    };
  },
  any
>({
  url: "/api/instance",
  method: "POST"
});

export const deleteInstance = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
  },
  any
>({
  url: "/api/instance",
  method: "DELETE"
});

export const renameInstance = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
    data: {
      newName: string;
    };
  },
  any
>({
  url: "/api/instance/rename",
  method: "PUT"
});

// 实例操作相关
export const startInstance = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
  },
  any
>({
  url: "/api/instance/start",
  method: "GET"
});

export const stopInstance = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
  },
  any
>({
  url: "/api/instance/stop",
  method: "GET"
});

export const restartInstance = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
  },
  any
>({
  url: "/api/instance/restart",
  method: "GET"
});

export const killInstance = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
  },
  any
>({
  url: "/api/instance/kill",
  method: "GET"
});

// 实例配置相关
export const saveInstanceConfig = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
    data: {
      config: any;
    };
  },
  any
>({
  url: "/api/instance/config",
  method: "POST"
});

export const getInstanceConfig = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
  },
  any
>({
  url: "/api/instance/config",
  method: "GET"
});

// 实例文件相关
export const getInstanceFileList = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
      path: string;
    };
  },
  IPanelFileInfo[]
>({
  url: "/api/instance/file/list",
  method: "GET"
});

export const createInstanceFile = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
    data: {
      path: string;
      content: string;
    };
  },
  any
>({
  url: "/api/instance/file/write",
  method: "POST"
});

export const readInstanceFile = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
      path: string;
    };
  },
  any
>({
  url: "/api/instance/file/read",
  method: "GET"
});

export const deleteInstanceFile = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
    data: {
      paths: string[];
    };
  },
  any
>({
  url: "/api/instance/file/delete",
  method: "POST"
});

export const renameInstanceFile = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
    data: {
      oldPath: string;
      newPath: string;
    };
  },
  any
>({
  url: "/api/instance/file/rename",
  method: "POST"
});

export const copyInstanceFile = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
    data: {
      sourcePath: string;
      targetPath: string;
    };
  },
  any
>({
  url: "/api/instance/file/copy",
  method: "POST"
});

export const moveInstanceFile = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
    data: {
      sourcePath: string;
      targetPath: string;
    };
  },
  any
>({
  url: "/api/instance/file/move",
  method: "POST"
});

export const createInstanceDirectory = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
    data: {
      path: string;
    };
  },
  any
>({
  url: "/api/instance/file/mkdir",
  method: "POST"
});

export const downloadInstanceFile = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
      path: string;
    };
  },
  any
>({
  url: "/api/instance/file/download",
  method: "GET"
});

// 实例命令相关
export const sendInstanceCommand = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
    data: {
      command: string;
    };
  },
  any
>({
  url: "/api/instance/command",
  method: "POST"
});

// 实例日志相关
export const getInstanceLog = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
      lines?: number;
      offset?: number;
    };
  },
  any
>({
  url: "/api/instance/log",
  method: "GET"
});

// 实例统计相关
export const getInstanceStats = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
  },
  any
>({
  url: "/api/instance/stats",
  method: "GET"
});

// 实例备份相关
export const createInstanceBackup = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
    data: {
      name: string;
    };
  },
  any
>({
  url: "/api/instance/backup/create",
  method: "POST"
});

export const getInstanceBackups = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
  },
  any
>({
  url: "/api/instance/backup/list",
  method: "GET"
});

export const deleteInstanceBackup = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
    data: {
      backupId: string;
    };
  },
  any
>({
  url: "/api/instance/backup/delete",
  method: "POST"
});

export const restoreInstanceBackup = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
    data: {
      backupId: string;
    };
  },
  any
>({
  url: "/api/instance/backup/restore",
  method: "POST"
});

// 实例计划任务相关
export const getInstanceSchedules = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
  },
  any
>({
  url: "/api/instance/schedule/list",
  method: "GET"
});

export const createInstanceSchedule = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
    data: {
      name: string;
      type: string;
      cron: string;
      enabled: boolean;
      params: any;
    };
  },
  any
>({
  url: "/api/instance/schedule/create",
  method: "POST"
});

export const updateInstanceSchedule = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
      scheduleId: string;
    };
    data: {
      name: string;
      type: string;
      cron: string;
      enabled: boolean;
      params: any;
    };
  },
  any
>({
  url: "/api/instance/schedule/update",
  method: "PUT"
});

export const deleteInstanceSchedule = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
      scheduleId: string;
    };
  },
  any
>({
  url: "/api/instance/schedule/delete",
  method: "DELETE"
});

// 实例环境变量相关
export const getInstanceEnvironments = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
  },
  any
>({
  url: "/api/instance/environment",
  method: "GET"
});

export const saveInstanceEnvironments = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
    data: {
      environments: any[];
    };
  },
  any
>({
  url: "/api/instance/environment",
  method: "POST"
});

// 实例文件上传相关
export const uploadInstanceFile = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
    data: FormData;
  },
  any
>({
  url: "/api/instance/file/upload",
  method: "POST",
  headers: {
    "Content-Type": "multipart/form-data"
  }
});

// 实例文件下载相关
export const downloadInstanceFileUrl = useDefineApi<
  {
    params: {
      uuid: string;
      daemonUuid: string;
    };
    data: {
      url: string;
      path: string;
    };
  },
  any
>({
  url: "/api/instance/file/download_url",
  method: "POST"
});

// 系统相关
export const getSystemInfo = useDefineApi<{}, any>({
  url: "/api/system/info",
  method: "GET"
});

export const getSystemStatus = useDefineApi<{}, any>({
  url: "/api/system/status",
  method: "GET"
});

export const restartSystem = useDefineApi<{}, any>({
  url: "/api/system/restart",
  method: "GET"
});

export const shutdownSystem = useDefineApi<{}, any>({
  url: "/api/system/shutdown",
  method: "GET"
});

// 日志相关
export const getSystemLogs = useDefineApi<
  {
    params: {
      type: string;
      limit?: number;
      offset?: number;
    };
  },
  any
>({
  url: "/api/system/logs",
  method: "GET"
});

// 用户相关
export const login = useDefineApi<
  {
    data: {
      username: string;
      password: string;
    };
  },
  any
>({
  url: "/api/user/login",
  method: "POST"
});

export const logout = useDefineApi<{}, any>({
  url: "/api/user/logout",
  method: "GET"
});

export const changePassword = useDefineApi<
  {
    data: {
      oldPassword: string;
      newPassword: string;
    };
  },
  any
>({
  url: "/api/user/password",
  method: "POST"
});

// 快速开始相关
export const getQuickStartPackages = useDefineApi<
  {
    params: {
      language: string;
    };
  },
  IQuickStartTemplate
>({
  url: "/api/quick_start/packages",
  method: "GET"
});

// 通知相关
export const getNotifications = useDefineApi<{}, any>({
  url: "/api/notification",
  method: "GET"
});

export const markNotificationAsRead = useDefineApi<
  {
    params: {
      id: string;
    };
  },
  any
>({
  url: "/api/notification/read",
  method: "GET"
});

// 网络相关
export const getNetworkInterfaces = useDefineApi<{}, any>({
  url: "/api/system/network/interfaces",
  method: "GET"
});

// 视觉数据相关
export const getVisualData = useDefineApi<
  {
    params: {
      type: string;
      timeRange: string;
    };
  },
  any
>({
  url: "/api/visual/data",
  method: "GET"
});

// 远程映射相关
export const getRemoteMappings = useDefineApi<{}, any>({
  url: "/api/service/remote_mappings",
  method: "GET"
});

export const saveRemoteMappings = useDefineApi<
  {
    data: any[];
  },
  any
>({
  url: "/api/service/remote_mappings",
  method: "POST"
});
