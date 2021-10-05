import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const notifySuccess = (content) => toast.success(content);
export const notifyError = (content) => toast.error(content);
export const notifyWarning = (content) => toast.warn(content);
export const notifyInfo = (content) => toast.info(content);