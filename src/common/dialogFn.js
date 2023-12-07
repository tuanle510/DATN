import { openDialog } from "vue3-promise-dialog";
import ConfirmDialog from "../components/base/Dialog/ConfirmDialog.vue";
import ConfirmYesDialog from "../components/base/Dialog/ConfirmYesDialog.vue";

// Form 2 button có, không
export async function confirm(title, content) {
  return await openDialog(ConfirmDialog, { title, content });
}
// Form 1 button Đồng ý
export async function confirmYes(title, content) {
  return await openDialog(ConfirmYesDialog, { title, content });
}
