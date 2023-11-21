import { openDialog } from "vue3-promise-dialog";
import ConfirmDialog from "../components/base/Dialog/ConfirmDialog.vue";

export async function confirm(title, content) {
  return await openDialog(ConfirmDialog, { title, content });
}
