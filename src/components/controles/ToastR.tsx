import { Toast } from "flowbite-react";
import { FunctionComponent, PropsWithChildren } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
  faCircleXmark,
  faStar,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";

interface IToastProps {
  type: string;
}
export const ToastR: FunctionComponent<PropsWithChildren<IToastProps>> = ({
  children,
  type,
}) => {
  let ToastClassName =
    "fixed flex items-center w-full h-12 max-w-xs p-4 space-x-4 text-gray-500 divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow right-5 bottom-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800";
  let iconClassName =
    "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg";
  let icon = <></>;
  switch (type) {
    case "success":
      ToastClassName += " bg-[#C3F9C2] ";
      iconClassName += " text-[#005F3E] ";
      icon = <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4" />;
      break;
    case "warning":
      ToastClassName += " bg-[#FFE4C1] ";
      iconClassName += " text-[#BD5B00] ";
      icon = <FontAwesomeIcon icon={faCircleExclamation} className="w-4 h-4" />;
      break;
    case "danger":
      ToastClassName += " bg-[#FFEBEB] ";
      iconClassName += " text-[#CC0000] ";
      icon = <FontAwesomeIcon icon={faCircleXmark} className="w-4 h-4" />;
      break;
    case "notif":
      ToastClassName += " bg-[#E9E4FF] ";
      iconClassName += " text-[#812AE7] ";
      icon = <FontAwesomeIcon icon={faStar} className="w-4 h-4" />;
      break;
    case "info":
      ToastClassName += " bg-[#D7EDFF] ";
      iconClassName += " text-[#0074E8] ";
      icon = <FontAwesomeIcon icon={faInfo} className="w-4 h-4" />;
      break;
    case "basic":
      ToastClassName += " bg-[#E9E9E9] ";
      icon = <></>;
      break;

    default:
      break;
  }

  return (
    <Toast className={ToastClassName}>
      <div className="ml-3 text-base font-normal text">{children}</div>
      <div className={iconClassName}>{icon}</div>

      {/* <Toast.Toggle onDismiss={() => setShowToast(false)}/> */}
    </Toast>
  );
};
