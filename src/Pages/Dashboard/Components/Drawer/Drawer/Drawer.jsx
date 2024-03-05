import DrawerOptions from '../Components/DrawerOptions/DrawerOptions';
import styles from './Drawer.module.css';

const drawers = [
  {
    id: '000',
    name: 'Dashboard',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        version="1.1"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        imageRendering="optimizeQuality"
        fillRule="evenodd"
        clipRule="evenodd"
        viewBox="0 0 512 512"
      >
        <defs />
        <g id="Layer_x0020_1">
          <metadata id="CorelCorpID_0Corel-Layer" />
          <g id="_547227824">
            <path
              fill="#EBF0F3"
              d="M481 485l-450 0c-17,0 -31,-14 -31,-31l0 -396c0,-17 14,-31 31,-31l450 0c17,0 31,14 31,31l0 396c0,17 -14,31 -31,31z"
            />
            <path fill="#3A556A" d="M16 127l480 0 16 0 0 -69c0,-17 -14,-31 -31,-31l-450 0c-17,0 -31,14 -31,31l0 69 16 0z" />
            <path fill="#27A2DB" d="M72 114c-16,0 -29,-13 -29,-29 0,-16 13,-29 29,-29 15,0 28,13 28,29 0,16 -13,29 -28,29z" />
            <path fill="#F8CF26" d="M158 114c-16,0 -29,-13 -29,-29 0,-16 13,-29 29,-29 16,0 28,13 28,29 0,16 -12,29 -28,29z" />
            <path fill="#ED1C24" d="M414 93l-148 0c-5,0 -8,-4 -8,-8 0,-4 3,-8 8,-8l148 0c5,0 8,4 8,8 0,4 -3,8 -8,8z" />
            <g>
              <g>
                <path fill="#0071BC" d="M122 201l0 0 0 0 0 95 95 0 0 0 0 0c0,52 -43,94 -95,94 -52,0 -95,-42 -95,-94 0,-53 43,-95 95,-95z" />
                <path fill="#39B54A" d="M166 156l0 0c53,0 95,43 95,95l0 0 -95 0 0 -95z" />
              </g>
              <g>
                <path
                  fill="#F8CF26"
                  d="M268 455c-4,0 -7,-3 -8,-7l-30 0c0,4 -4,7 -8,7 -4,0 -8,-4 -8,-8l0 -68c0,-4 4,-8 8,-8l46 0c5,0 8,4 8,8l0 68c0,4 -3,8 -8,8z"
                />
                <path
                  fill="#39B54A"
                  d="M351 455c-4,0 -8,-4 -8,-8l0 0 -30 0 0 0c0,4 -3,8 -8,8 -4,0 -8,-4 -8,-8l0 -146c0,-5 4,-8 8,-8l46 0c5,0 8,3 8,8l0 146c0,4 -3,8 -8,8z"
                />
                <path
                  fill="#ED1C24"
                  d="M435 455c-5,0 -8,-3 -8,-7l-31 0c0,4 -3,7 -8,7 -4,0 -8,-4 -8,-8l0 -104c0,-5 4,-8 8,-8l47 0c4,0 8,3 8,8l0 104c0,4 -4,8 -8,8z"
                />
                <path fill="#29485A" d="M477 455l-297 0c-5,0 -8,-4 -8,-8 0,-4 3,-8 8,-8l297 0c4,0 8,4 8,8 0,4 -4,8 -8,8z" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    ),
    link: '/dashboard',
  },
  {
    id: '0001',
    name: 'Games',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M41.714 40.829C40.8796 40.8283 40.0571 40.6305 39.3136 40.2519C38.57 39.8733 37.9264 39.3244 37.435 38.65L32.77 32.236C32.4911 31.8537 32.126 31.5425 31.7043 31.3278C31.2826 31.113 30.8162 31.0007 30.343 31H17.657C17.1838 31.0007 16.7174 31.113 16.2957 31.3278C15.874 31.5425 15.5089 31.8537 15.23 32.236L10.565 38.65C9.87183 39.6031 8.88013 40.2974 7.74735 40.6225C6.61457 40.9477 5.40562 40.8851 4.31246 40.4448C3.2193 40.0044 2.30457 39.2115 1.7135 38.1919C1.12244 37.1723 0.888909 35.9845 1.05 34.817L3.2 19.224C3.63918 16.1175 5.1827 13.2732 7.54789 11.212C9.91309 9.15072 12.9417 8.01046 16.079 8H31.921C35.0583 8.01046 38.0869 9.15072 40.4521 11.212C42.8173 13.2732 44.3608 16.1175 44.8 19.224L46.95 34.817C47.0531 35.5652 46.9947 36.3269 46.7789 37.0507C46.5631 37.7745 46.1947 38.4437 45.6987 39.0133C45.2026 39.5829 44.5903 40.0396 43.903 40.3528C43.2157 40.666 42.4693 40.8284 41.714 40.829V40.829Z"
          fill="#2D4A60"
        />
        <path
          d="M26.5 19V20C26.5 20.663 26.7634 21.2989 27.2322 21.7678C27.7011 22.2366 28.337 22.5 29 22.5C29.663 22.5 30.2989 22.2366 30.7678 21.7678C31.2366 21.2989 31.5 20.663 31.5 20V19H26.5Z"
          fill="#263F52"
        />
        <path
          d="M35.5 19V20C35.5 20.663 35.7634 21.2989 36.2322 21.7678C36.7011 22.2366 37.337 22.5 38 22.5C38.663 22.5 39.2989 22.2366 39.7678 21.7678C40.2366 21.2989 40.5 20.663 40.5 20V19H35.5Z"
          fill="#263F52"
        />
        <path
          d="M31 14.5V15.5C31 16.163 31.2634 16.7989 31.7322 17.2678C32.2011 17.7366 32.837 18 33.5 18C34.163 18 34.7989 17.7366 35.2678 17.2678C35.7366 16.7989 36 16.163 36 15.5V14.5H31Z"
          fill="#263F52"
        />
        <path
          d="M33.5 17C34.8807 17 36 15.8807 36 14.5C36 13.1193 34.8807 12 33.5 12C32.1193 12 31 13.1193 31 14.5C31 15.8807 32.1193 17 33.5 17Z"
          fill="#FAC100"
        />
        <path
          d="M31 23.5V24.5C31 25.163 31.2634 25.7989 31.7322 26.2678C32.2011 26.7366 32.837 27 33.5 27C34.163 27 34.7989 26.7366 35.2678 26.2678C35.7366 25.7989 36 25.163 36 24.5V23.5H31Z"
          fill="#263F52"
        />
        <path
          d="M33.5 26C34.8807 26 36 24.8807 36 23.5C36 22.1193 34.8807 21 33.5 21C32.1193 21 31 22.1193 31 23.5C31 24.8807 32.1193 26 33.5 26Z"
          fill="#009AE0"
        />
        <path
          d="M29 21.5C30.3807 21.5 31.5 20.3807 31.5 19C31.5 17.6193 30.3807 16.5 29 16.5C27.6193 16.5 26.5 17.6193 26.5 19C26.5 20.3807 27.6193 21.5 29 21.5Z"
          fill="#FD3730"
        />
        <path
          d="M38 21.5C39.3807 21.5 40.5 20.3807 40.5 19C40.5 17.6193 39.3807 16.5 38 16.5C36.6193 16.5 35.5 17.6193 35.5 19C35.5 20.3807 36.6193 21.5 38 21.5Z"
          fill="#00CF66"
        />
        <path
          d="M8 19V20.5C8 21.163 8.26339 21.7989 8.73223 22.2678C9.20107 22.7366 9.83696 23 10.5 23H12V24.5C12 25.163 12.2634 25.7989 12.7322 26.2678C13.2011 26.7366 13.837 27 14.5 27C15.163 27 15.7989 26.7366 16.2678 26.2678C16.7366 25.7989 17 25.163 17 24.5V23H18.5C19.163 23 19.7989 22.7366 20.2678 22.2678C20.7366 21.7989 21 21.163 21 20.5V19H8Z"
          fill="#263F52"
        />
        <path
          d="M18.5 16.5H17V15C17 14.337 16.7366 13.7011 16.2678 13.2322C15.7989 12.7634 15.163 12.5 14.5 12.5C13.837 12.5 13.2011 12.7634 12.7322 13.2322C12.2634 13.7011 12 14.337 12 15V16.5H10.5C9.83696 16.5 9.20107 16.7634 8.73223 17.2322C8.26339 17.7011 8 18.337 8 19C8 19.663 8.26339 20.2989 8.73223 20.7678C9.20107 21.2366 9.83696 21.5 10.5 21.5H12V23C12 23.663 12.2634 24.2989 12.7322 24.7678C13.2011 25.2366 13.837 25.5 14.5 25.5C15.163 25.5 15.7989 25.2366 16.2678 24.7678C16.7366 24.2989 17 23.663 17 23V21.5H18.5C19.163 21.5 19.7989 21.2366 20.2678 20.7678C20.7366 20.2989 21 19.663 21 19C21 18.337 20.7366 17.7011 20.2678 17.2322C19.7989 16.7634 19.163 16.5 18.5 16.5Z"
          fill="#EAEFF0"
        />
      </svg>
    ),
    subDrawer: [
      { id: '01', name: 'All Games', link: '/games/all' },
      { id: '02', name: 'Add Game', link: '/games/add' },
    ],
  },
  {
    id: '0002',
    name: 'Users',
    icon: (
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 53 53"
        enableBackground="new 0 0 53 53"
        xmlSpace="preserve"
      >
        <path
          fill="#E7ECED"
          d="M18.613,41.552l-7.907,4.313c-0.464,0.253-0.881,0.564-1.269,0.903C14.047,50.655,19.998,53,26.5,53
c6.454,0,12.367-2.31,16.964-6.144c-0.424-0.358-0.884-0.68-1.394-0.934l-8.467-4.233c-1.094-0.547-1.785-1.665-1.785-2.888v-3.322
c0.238-0.271,0.51-0.619,0.801-1.03c1.154-1.63,2.027-3.423,2.632-5.304c1.086-0.335,1.886-1.338,1.886-2.53v-3.546
c0-0.78-0.347-1.477-0.886-1.965v-5.126c0,0,1.053-7.977-9.75-7.977s-9.75,7.977-9.75,7.977v5.126
c-0.54,0.488-0.886,1.185-0.886,1.965v3.546c0,0.934,0.491,1.756,1.226,2.231c0.886,3.857,3.206,6.633,3.206,6.633v3.24
C20.296,39.899,19.65,40.986,18.613,41.552z"
        />
        <g>
          <path
            fill="#556080"
            d="M26.953,0.004C12.32-0.246,0.254,11.414,0.004,26.047C-0.138,34.344,3.56,41.801,9.448,46.76
  c0.385-0.336,0.798-0.644,1.257-0.894l7.907-4.313c1.037-0.566,1.683-1.653,1.683-2.835v-3.24c0,0-2.321-2.776-3.206-6.633
  c-0.734-0.475-1.226-1.296-1.226-2.231v-3.546c0-0.78,0.347-1.477,0.886-1.965v-5.126c0,0-1.053-7.977,9.75-7.977
  s9.75,7.977,9.75,7.977v5.126c0.54,0.488,0.886,1.185,0.886,1.965v3.546c0,1.192-0.8,2.195-1.886,2.53
  c-0.605,1.881-1.478,3.674-2.632,5.304c-0.291,0.411-0.563,0.759-0.801,1.03V38.8c0,1.223,0.691,2.342,1.785,2.888l8.467,4.233
  c0.508,0.254,0.967,0.575,1.39,0.932c5.71-4.762,9.399-11.882,9.536-19.9C53.246,12.32,41.587,0.254,26.953,0.004z"
          />
        </g>
      </svg>
    ),
    link: '/users',
  },
  { id: '0003', name: 'Game Tags', icon: 'tag', link: '/tags' },
  {
    id: '0004',
    name: 'Admins',
    icon: (
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 53 53"
        enableBackground="new 0 0 53 53"
        xmlSpace="preserve"
      >
        <path
          fill="rgb(51, 44, 0)"
          d="M18.613,41.552l-7.907,4.313c-0.464,0.253-0.881,0.564-1.269,0.903C14.047,50.655,19.998,53,26.5,53
c6.454,0,12.367-2.31,16.964-6.144c-0.424-0.358-0.884-0.68-1.394-0.934l-8.467-4.233c-1.094-0.547-1.785-1.665-1.785-2.888v-3.322
c0.238-0.271,0.51-0.619,0.801-1.03c1.154-1.63,2.027-3.423,2.632-5.304c1.086-0.335,1.886-1.338,1.886-2.53v-3.546
c0-0.78-0.347-1.477-0.886-1.965v-5.126c0,0,1.053-7.977-9.75-7.977s-9.75,7.977-9.75,7.977v5.126
c-0.54,0.488-0.886,1.185-0.886,1.965v3.546c0,0.934,0.491,1.756,1.226,2.231c0.886,3.857,3.206,6.633,3.206,6.633v3.24
C20.296,39.899,19.65,40.986,18.613,41.552z"
        />
        <g>
          <path
            fill="rgb(255, 215, 0)"
            d="M26.953,0.004C12.32-0.246,0.254,11.414,0.004,26.047C-0.138,34.344,3.56,41.801,9.448,46.76
  c0.385-0.336,0.798-0.644,1.257-0.894l7.907-4.313c1.037-0.566,1.683-1.653,1.683-2.835v-3.24c0,0-2.321-2.776-3.206-6.633
  c-0.734-0.475-1.226-1.296-1.226-2.231v-3.546c0-0.78,0.347-1.477,0.886-1.965v-5.126c0,0-1.053-7.977,9.75-7.977
  s9.75,7.977,9.75,7.977v5.126c0.54,0.488,0.886,1.185,0.886,1.965v3.546c0,1.192-0.8,2.195-1.886,2.53
  c-0.605,1.881-1.478,3.674-2.632,5.304c-0.291,0.411-0.563,0.759-0.801,1.03V38.8c0,1.223,0.691,2.342,1.785,2.888l8.467,4.233
  c0.508,0.254,0.967,0.575,1.39,0.932c5.71-4.762,9.399-11.882,9.536-19.9C53.246,12.32,41.587,0.254,26.953,0.004z"
          />
        </g>
      </svg>
    ),
    link: '/admins',
  },
  {
    id: '0005',
    name: 'Events',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <g id="Layer_40" data-name="Layer 40">
          <path
            fill="#ccc"
            d="M52.55,4.39H49.16a.61.61,0,0,0-.56.81c.1,0,0,3.63,0,3.74a.59.59,0,0,0,.6.65h3.29a2.41,2.41,0,0,1,2.4,2.4V53.08a2.41,2.41,0,0,1-2.4,2.4H11.45a2.41,2.41,0,0,1-2.4-2.4V12a2.41,2.41,0,0,1,2.4-2.4h3.31a.6.6,0,0,0,.6-.6c0-.07,0-3.85.05-3.79a.61.61,0,0,0-.56-.81h-3.4A7.61,7.61,0,0,0,3.85,12V53.08a7.61,7.61,0,0,0,7.6,7.6h41.1a7.61,7.61,0,0,0,7.6-7.6V12A7.61,7.61,0,0,0,52.55,4.39Z"
          />
          <rect fill="#e6e6e6" x="7.85" y="8.39" width="48.29" height="48.29" rx="3.6" />
          <path
            fill="#e4202b"
            d="M52.54,8.39H11.45A3.61,3.61,0,0,0,7.85,12v4.94a.6.6,0,0,0,.6.6H55.54a.6.6,0,0,0,.6-.6V12A3.61,3.61,0,0,0,52.54,8.39Z"
          />
          <path fill="#e6e6e6" d="M16.9,3.32A2.29,2.29,0,0,0,14.16,5.5v7c0,2.95,4.91,2.95,4.93,0v-7A2.19,2.19,0,0,0,16.9,3.32Z" />
          <path fill="#e6e6e6" d="M32.28,3.32A2.29,2.29,0,0,0,29.54,5.5v7c0,2.95,4.91,2.95,4.93,0v-7A2.19,2.19,0,0,0,32.28,3.32Z" />
          <path fill="#e6e6e6" d="M47.66,3.32A2.3,2.3,0,0,0,44.91,5.5v7c0,2.95,4.92,2.95,4.94,0v-7A2.19,2.19,0,0,0,47.66,3.32Z" />
          <path
            fill="#333132"
            d="M31.58,27.16a.62.62,0,0,0,.84,0L38.1,21.7a.6.6,0,0,0-.84-.86L32,25.89l-5.26-5.05c-.56-.55-1.41.33-.84.86Z"
          />
          <path
            fill="#333132"
            d="M40.6,50.74,38.38,45a.61.61,0,0,0-.56-.38H26.18a.61.61,0,0,0-.56.38L23.4,50.74a.59.59,0,0,0,.34.77.6.6,0,0,0,.78-.34l2.07-5.34H37.41l2.07,5.34A.6.6,0,0,0,40.6,50.74Z"
          />
          <rect fill="#d29c6d" x="16.56" y="26.13" width="30.88" height="19.7" rx="2.6" />
          <path fill="#0097ce" d="M15.9,21.72c-.89,0-.53-1.26-.6-1.87a.6.6,0,0,1,.6-.6c.89,0,.53,1.25.6,1.87A.6.6,0,0,1,15.9,21.72Z" />
          <path fill="#0097ce" d="M15.9,26.56c-.89,0-.53-1.25-.6-1.87a.6.6,0,0,1,.6-.6c.89,0,.53,1.26.6,1.87A.6.6,0,0,1,15.9,26.56Z" />
          <path
            fill="#0097ce"
            d="M17.15,22.24a.61.61,0,0,1-.42-1c.45-.36,1.09-1.51,1.74-.89s-.54,1.28-.89,1.74A.61.61,0,0,1,17.15,22.24Z"
          />
          <path fill="#0097ce" d="M18.94,23.49H17.67a.6.6,0,0,1,0-1.2h1.27A.6.6,0,0,1,18.94,23.49Z" />
          <path fill="#0097ce" d="M18.05,25.63a.59.59,0,0,1-.43-.17c-.35-.46-1.51-1.09-.89-1.74s1.29.53,1.74.89A.6.6,0,0,1,18.05,25.63Z" />
          <path
            fill="#0097ce"
            d="M13.75,25.63a.6.6,0,0,1-.42-1c.45-.36,1.09-1.51,1.74-.89a.6.6,0,0,1,0,.84C14.81,24.76,14.13,25.69,13.75,25.63Z"
          />
          <path fill="#0097ce" d="M14.13,23.49H12.86a.6.6,0,0,1,0-1.2h1.27A.6.6,0,0,1,14.13,23.49Z" />
          <path
            fill="#0097ce"
            d="M14.65,22.24c-.38.05-1.07-.88-1.32-1.08a.58.58,0,0,1,0-.84c.64-.62,1.28.53,1.74.89A.61.61,0,0,1,14.65,22.24Z"
          />
          <path fill="#0097ce" d="M16.43,49c-.89,0-.53-1.24-.6-2a.6.6,0,0,1,.6-.6c.89,0,.53,1.24.6,2A.6.6,0,0,1,16.43,49Z" />
          <path fill="#0097ce" d="M16.43,54.26c-.89,0-.53-1.24-.6-2a.6.6,0,0,1,.6-.6c.89,0,.53,1.24.6,2A.6.6,0,0,1,16.43,54.26Z" />
          <path fill="#0097ce" d="M17.8,49.53a.6.6,0,0,1-.43-1c.55-.45,1.18-1.6,1.83-1s-.53,1.28-1,1.82A.58.58,0,0,1,17.8,49.53Z" />
          <path fill="#0097ce" d="M19.75,50.9c-.74-.07-1.95.29-2-.6s1.24-.53,2-.6A.6.6,0,0,1,19.75,50.9Z" />
          <path fill="#0097ce" d="M18.78,53.25a.63.63,0,0,1-.43-.17c-.44-.55-1.59-1.18-1-1.83s1.29.53,1.83,1A.6.6,0,0,1,18.78,53.25Z" />
          <path fill="#0097ce" d="M14.08,53.25a.6.6,0,0,1-.43-1c.55-.45,1.18-1.6,1.83-1s-.53,1.28-1,1.83A.63.63,0,0,1,14.08,53.25Z" />
          <path fill="#0097ce" d="M14.49,50.9c-.74-.07-2,.29-2-.6s1.25-.53,2-.6A.6.6,0,0,1,14.49,50.9Z" />
          <path fill="#0097ce" d="M15.06,49.53a.6.6,0,0,1-.43-.18c-.44-.54-1.59-1.17-1-1.82s1.29.53,1.83,1A.6.6,0,0,1,15.06,49.53Z" />
          <path fill="#0097ce" d="M49.79,22.73c-.89,0-.53-1.25-.6-1.87a.6.6,0,0,1,.6-.6c.89,0,.53,1.26.6,1.87A.6.6,0,0,1,49.79,22.73Z" />
          <path fill="#0097ce" d="M49.79,27.57c-.89,0-.53-1.25-.6-1.86a.6.6,0,0,1,.6-.6c.89,0,.53,1.25.6,1.86A.6.6,0,0,1,49.79,27.57Z" />
          <path fill="#0097ce" d="M51,23.25a.6.6,0,0,1-.42-1c.45-.36,1.09-1.52,1.74-.9s-.54,1.29-.9,1.74A.58.58,0,0,1,51,23.25Z" />
          <path fill="#0097ce" d="M52.82,24.5H51.56a.6.6,0,0,1,0-1.2h1.26A.6.6,0,0,1,52.82,24.5Z" />
          <path
            fill="#0097ce"
            d="M51.94,26.65c-.38.06-1.07-.87-1.32-1.07a.59.59,0,0,1,0-.85c.64-.62,1.28.54,1.74.89A.61.61,0,0,1,51.94,26.65Z"
          />
          <path
            fill="#0097ce"
            d="M47.64,26.65a.61.61,0,0,1-.42-1c.45-.35,1.09-1.51,1.74-.89s-.54,1.29-.89,1.74A.61.61,0,0,1,47.64,26.65Z"
          />
          <path fill="#0097ce" d="M48,24.5H46.75a.6.6,0,0,1,0-1.2H48A.6.6,0,0,1,48,24.5Z" />
          <path fill="#0097ce" d="M48.54,23.25a.6.6,0,0,1-.43-.18c-.36-.45-1.51-1.09-.89-1.74s1.28.54,1.74.9A.6.6,0,0,1,48.54,23.25Z" />
          <path fill="#0097ce" d="M49.61,47.92a.6.6,0,0,1-.6-.6V45.84a.6.6,0,0,1,1.2,0v1.48A.6.6,0,0,1,49.61,47.92Z" />
          <path fill="#0097ce" d="M49.61,53.57A.6.6,0,0,1,49,53V51.49a.6.6,0,1,1,1.2,0V53A.6.6,0,0,1,49.61,53.57Z" />
          <path
            fill="#0097ce"
            d="M51.07,48.52a.6.6,0,0,1-.42-1l1-1a.61.61,0,0,1,.85,0,.59.59,0,0,1,0,.85l-1,1.05A.63.63,0,0,1,51.07,48.52Z"
          />
          <path fill="#0097ce" d="M53.16,50H51.68a.6.6,0,0,1-.6-.6.6.6,0,0,1,.6-.6h1.48A.6.6,0,0,1,53.16,50Z" />
          <path fill="#0097ce" d="M52.12,52.49a.6.6,0,0,1-.43-.18l-1-1a.6.6,0,0,1,.85-.85l1,1A.6.6,0,0,1,52.12,52.49Z" />
          <path fill="#0097ce" d="M47.11,52.49a.6.6,0,0,1-.43-1l1-1a.61.61,0,0,1,.85,0,.6.6,0,0,1,0,.85l-1,1A.59.59,0,0,1,47.11,52.49Z" />
          <path fill="#0097ce" d="M47.54,50H46.07a.6.6,0,0,1-.6-.6.6.6,0,0,1,.6-.6h1.47A.6.6,0,0,1,47.54,50Z" />
          <path fill="#0097ce" d="M48.15,48.52a.61.61,0,0,1-.42-.17l-1-1.05a.6.6,0,0,1,.85-.85l1,1A.6.6,0,0,1,48.15,48.52Z" />
          <path d="M30.51,26.13H19.16a2.59,2.59,0,0,0-2.6,2.6v14.5a2.6,2.6,0,0,0,2.6,2.6h6.15L23.4,50.74a.6.6,0,0,0,1.12.43l2.07-5.34H37.41l2.07,5.34a.6.6,0,0,0,1.12-.43l-1.91-4.91h6.15a2.6,2.6,0,0,0,2.6-2.6V28.73a2.59,2.59,0,0,0-2.6-2.6H33.49L38.1,21.7a.6.6,0,0,0-.84-.86L32,25.89l-5.26-5.05c-.56-.55-1.41.33-.84.86Zm15.73,2.6v14.5a1.4,1.4,0,0,1-1.4,1.4H19.16a1.4,1.4,0,0,1-1.4-1.4V28.73a1.4,1.4,0,0,1,1.4-1.4H44.84A1.4,1.4,0,0,1,46.24,28.73Z" />
          <path d="M52.54,4.39h-3A2.4,2.4,0,0,0,47.1,3.32,2.18,2.18,0,0,0,44.92,5.5V8.39H34.47V5.5a2.3,2.3,0,0,0-2.75-2.18A2.19,2.19,0,0,0,29.54,5.5V8.39H19.09V5.5A2.19,2.19,0,0,0,16.9,3.32a2.44,2.44,0,0,0-2.43,1.07h-3A7.6,7.6,0,0,0,3.86,12V53.08a7.6,7.6,0,0,0,7.6,7.6H52.54a7.6,7.6,0,0,0,7.6-7.6V12A7.6,7.6,0,0,0,52.54,4.39ZM46.11,5.5c0-.88.81-1,1.55-1a1,1,0,0,1,1,1v7c0,.89-.81,1-1.55,1a1,1,0,0,1-1-1Zm-15.37,0c0-.89.8-1,1.54-1a1,1,0,0,1,1,1V9s0,0,0,0v3.48a1,1,0,0,1-1,1c-.74.06-1.51-.09-1.54-1Zm-1.2,4.09v2.89a2.3,2.3,0,0,0,2.74,2.19,2.19,2.19,0,0,0,2.19-2.19V9.59H44.92v2.89a2.3,2.3,0,0,0,2.74,2.19,2.18,2.18,0,0,0,2.18-2.19V9.59h2.7a2.4,2.4,0,0,1,2.4,2.4v4.34H9.05V12a2.41,2.41,0,0,1,2.4-2.4h2.71v2.89a2.3,2.3,0,0,0,2.74,2.19,2.19,2.19,0,0,0,2.19-2.19V9.59ZM9.05,17.53H54.94V53.08a2.4,2.4,0,0,1-2.4,2.4H11.45a2.41,2.41,0,0,1-2.4-2.4Zm6.31-12c0-.89.8-1,1.54-1a1,1,0,0,1,1,1V9a0,0,0,0,0,0,0v3.47a1,1,0,0,1-1,1c-.74.06-1.51-.1-1.54-1ZM59,53.08a6.41,6.41,0,0,1-6.41,6.4H11.46a6.41,6.41,0,0,1-6.41-6.4V12a6.41,6.41,0,0,1,6.41-6.4h2.7v2.8H11.45A3.6,3.6,0,0,0,7.85,12V53.08a3.61,3.61,0,0,0,3.6,3.6H52.54a3.6,3.6,0,0,0,3.6-3.6V16.94s0,0,0,0V12a3.6,3.6,0,0,0-3.6-3.6h-2.7V5.59h2.7A6.41,6.41,0,0,1,59,12Z" />
          <path d="M15.9,21.72c.89,0,.53-1.26.6-1.87a.6.6,0,0,0-.6-.6c-.89,0-.53,1.25-.6,1.87A.6.6,0,0,0,15.9,21.72Z" />
          <path d="M15.9,26.56c.89,0,.53-1.25.6-1.87a.6.6,0,0,0-.6-.6c-.89,0-.53,1.26-.6,1.87A.6.6,0,0,0,15.9,26.56Z" />
          <path d="M17.15,22.24a.61.61,0,0,0,.43-.18c.35-.46,1.51-1.09.89-1.74s-1.29.53-1.74.89A.61.61,0,0,0,17.15,22.24Z" />
          <path d="M17.07,22.89c0,.89,1.25.53,1.87.6a.6.6,0,0,0,.6-.6c0-.89-1.25-.53-1.87-.6A.6.6,0,0,0,17.07,22.89Z" />
          <path d="M17.62,25.46a.6.6,0,0,0,.85-.85l-.89-.89c-.55-.56-1.41.3-.85.84Z" />
          <path d="M14.17,25.46l.9-.9c.56-.54-.3-1.4-.85-.84l-.89.89A.6.6,0,0,0,14.17,25.46Z" />
          <path d="M12.86,23.49h1.27a.6.6,0,0,0,0-1.2H12.86A.6.6,0,0,0,12.86,23.49Z" />
          <path d="M14.22,22.06a.6.6,0,0,0,.85-.85l-.9-.89a.59.59,0,0,0-.84.84Z" />
          <path d="M16.43,46.38c-.89,0-.53,1.24-.6,2a.6.6,0,0,0,.6.6c.89,0,.53-1.24.6-2A.6.6,0,0,0,16.43,46.38Z" />
          <path d="M16.43,51.68c-.89,0-.53,1.24-.6,2a.6.6,0,0,0,.6.6c.89,0,.53-1.24.6-2A.6.6,0,0,0,16.43,51.68Z" />
          <path d="M17.8,49.53a.58.58,0,0,0,.42-.18c.45-.54,1.6-1.17,1-1.82s-1.28.53-1.83,1A.6.6,0,0,0,17.8,49.53Z" />
          <path d="M19.75,49.7c-.74.07-1.95-.29-2,.6s1.24.53,2,.6A.6.6,0,0,0,19.75,49.7Z" />
          <path d="M18.22,51.25c-.54-.56-1.4.3-.85.85.27.2,1,1.21,1.41,1.15a.6.6,0,0,0,.42-1Z" />
          <path d="M14.63,51.25l-1,1a.6.6,0,0,0,.43,1c.38.06,1.14-1,1.4-1.15C16,51.55,15.17,50.69,14.63,51.25Z" />
          <path d="M15.09,50.3c0-.89-1.24-.53-2-.6a.6.6,0,0,0-.6.6c0,.89,1.25.53,2,.6A.6.6,0,0,0,15.09,50.3Z" />
          <path d="M14.5,47.53c-.54-.56-1.4.3-.85.84.27.21,1,1.22,1.41,1.16a.6.6,0,0,0,.42-1Z" />
          <path d="M49.79,22.73c.89,0,.53-1.25.6-1.87a.6.6,0,0,0-.6-.6c-.89,0-.53,1.26-.6,1.87A.6.6,0,0,0,49.79,22.73Z" />
          <path d="M49.79,27.57c.89,0,.53-1.25.6-1.86a.6.6,0,0,0-.6-.6c-.89,0-.53,1.25-.6,1.86A.6.6,0,0,0,49.79,27.57Z" />
          <path d="M51,23.25a.58.58,0,0,0,.42-.18c.36-.45,1.51-1.09.9-1.74s-1.29.54-1.74.9A.6.6,0,0,0,51,23.25Z" />
          <path d="M51,23.9c0,.89,1.25.53,1.86.6a.6.6,0,0,0,.6-.6c0-.89-1.25-.53-1.86-.6A.6.6,0,0,0,51,23.9Z" />
          <path d="M51.51,26.47a.6.6,0,0,0,.85-.85l-.9-.89c-.54-.56-1.4.31-.84.85Z" />
          <path d="M49,24.73c-.65-.62-1.29.54-1.74.89a.59.59,0,0,0,0,.85c.65.62,1.28-.53,1.74-.89A.61.61,0,0,0,49,24.73Z" />
          <path d="M46.75,24.5H48a.6.6,0,0,0,0-1.2H46.75A.6.6,0,0,0,46.75,24.5Z" />
          <path d="M48.11,23.07a.6.6,0,0,0,.85-.84l-.89-.9a.6.6,0,0,0-.85.85Z" />
          <path d="M49,47.32a.6.6,0,0,0,1.2,0V45.84a.6.6,0,0,0-1.2,0Z" />
          <path d="M49.61,50.89a.6.6,0,0,0-.6.6V53a.6.6,0,0,0,1.2,0V51.49A.6.6,0,0,0,49.61,50.89Z" />
          <path d="M51.07,48.52a.63.63,0,0,0,.43-.17l1-1.05a.59.59,0,0,0,0-.85.61.61,0,0,0-.85,0l-1,1A.6.6,0,0,0,51.07,48.52Z" />
          <path d="M51.68,48.78a.6.6,0,0,0,0,1.2h1.48a.6.6,0,0,0,0-1.2Z" />
          <path d="M51.5,50.42c-.54-.56-1.41.31-.85.85.27.2,1.09,1.29,1.47,1.22a.6.6,0,0,0,.42-1Z" />
          <path d="M47.73,50.42l-1,1a.6.6,0,0,0,.43,1c.37.07,1.2-1,1.46-1.22C49.13,50.73,48.27,49.86,47.73,50.42Z" />
          <path d="M48.14,49.38a.6.6,0,0,0-.6-.6H46.07a.6.6,0,0,0-.6.6.6.6,0,0,0,.6.6h1.47A.59.59,0,0,0,48.14,49.38Z" />
          <path d="M47.53,46.45c-.54-.55-1.41.31-.85.85.27.2,1.09,1.29,1.47,1.22a.6.6,0,0,0,.42-1Z" />
        </g>
      </svg>
    ),
    subDrawer: [
      { id: '01', name: 'Slider', link: '/games/all' },
      { id: '02', name: 'Game on sale', link: '/games/add' },
      { id: '03', name: 'Free Games', link: '/games/add' },
    ],
  },
  { id: '0006', name: 'Orders', icon: 'order', link: '/orders' },
];
const Drawer = () => (
  <div className={styles.drawer}>
    <ul className={styles.optionContainer}>
      {drawers.map(drawer => (
        <DrawerOptions key={drawer.id} option={drawer} />
      ))}
    </ul>
  </div>
);
export default Drawer;
