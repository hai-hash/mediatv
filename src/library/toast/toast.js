import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const notifySuccess = (content) => toast(content);
export const notifyError = (content) => toast(content);
export const notifyWarning = (content) => toast(content);
export const notifyInfo = (content) => toast(content);