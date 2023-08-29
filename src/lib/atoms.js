import { atom } from "nanostores";

export const $notify = atom({
  show: false,
  message: "Hello people",
  content: "Hello people",
  level: "info",
  title: "Title",
});

export const $sidebar = atom({
  show: false,
});

export const setNotifyMessage = (obj) => {
  const {
    show = $notify.get().show,
    message = $notify.get().message,
    title = $notify.get().title,
    content = $notify.get().content,
    ...rest
  } = obj;
  $notify.set({
    ...$notify.get(),
    message,
    title,
    show,
    content,
    ...rest,
  });
};

export const setShowSidebar = (show) => {
  $sidebar.set({ show });
};
