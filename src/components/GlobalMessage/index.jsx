import { message  } from 'antd';

message.config({
  maxCount: 3,
  top: 0
});

export const globalMessage = (msg) => {
  message.destroy()
  switch (msg.type) {
    case 'success':
      return message.success(msg.text);

    case 'error':
      return message.error(msg.text);

    case 'warning':
      return message.warning(msg.text);
  
    default:
      return message.info(msg.text);
  }
}

