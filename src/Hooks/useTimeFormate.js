export default function useTimeFormat() {
  return second => {
    let time;
    if (second < 3600) {
      time = new Date(second * 1000).toISOString().substring(14, 19);
    } else {
      time = new Date(second * 1000).toISOString().substring(11, 16);
    }
    if (time[0] === '0') {
      time = time.slice(1);
    }
    return time;
  };
}
