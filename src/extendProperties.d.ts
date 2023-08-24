import { ComponentCustomProperties } from "vue";
import $axios from'axios' 

import type {AxiosInstance } from "axios";

//全局配置Axios
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
      $axios: AxiosInstance;
    }
}

// 必须导出，才能在其他文件中使用
export default ComponentCustomProperties;