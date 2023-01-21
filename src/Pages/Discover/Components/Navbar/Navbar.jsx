import useScreenWidth from '../../../../Hooks/useScreenWidth';
import FirstNavbar from '../../../../Shared/FirstNavbar/FirstNavbar';
import SecondNavbar from '../../../../Shared/SecondNavbar/SecondNavbar';

export default function Navbar() {
  const screenWidth = useScreenWidth();
  return (
    <>
      <FirstNavbar screenWidth={screenWidth} />
      <SecondNavbar screenWidth={screenWidth} />
    </>
  );
}
