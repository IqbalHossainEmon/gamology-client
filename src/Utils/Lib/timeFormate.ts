export default function formatTime(second: number) {
  let time: string;
  if (second < 3600) {
    time = new Date(second * 1000).toISOString().slice(14, 19);
  } else {
    time = new Date(second * 1000).toISOString().slice(11, 16);
  }

  if (time.startsWith("0")) {
    time = time.slice(1);
  }
  return time;
}
