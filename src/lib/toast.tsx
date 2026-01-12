import { Toast, type ToastManagerAddOptions } from "@base-ui/react";

type ToastOpts = ToastManagerAddOptions<never>;

export type ToastExtraOpts = {
  type?: "danger" | "default";
} & ToastOpts;

const manager = Toast.createToastManager();

export default {
  manager,
  add: ({ type = "default", ...opts }: ToastExtraOpts) => {
    return manager.add({ type, ...opts });
  },
  danger: (opts: ToastOpts) => manager.add({ type: "danger", ...opts }),
};
