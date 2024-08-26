import { useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../../../../Hooks/useDropDownHide';
import useScreenWidth from '../../../../../Hooks/useScreenWidth';
import ScreenShadow from '../../../../../Shared/ScreenShadow/ScreenShadow';
import ScrollBar from '../../../../../Shared/ScrollBar/ScrollBar';
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
				<g>
					<g>
						<path
							fill="#EBF0F3"
							d="M481 485l-450 0c-17,0 -31,-14 -31,-31l0 -396c0,-17 14,-31 31,-31l450 0c17,0 31,14 31,31l0 396c0,17 -14,31 -31,31z"
						/>
						<path
							fill="#3A556A"
							d="M16 127l480 0 16 0 0 -69c0,-17 -14,-31 -31,-31l-450 0c-17,0 -31,14 -31,31l0 69 16 0z"
						/>
						<path
							fill="#27A2DB"
							d="M72 114c-16,0 -29,-13 -29,-29 0,-16 13,-29 29,-29 15,0 28,13 28,29 0,16 -13,29 -28,29z"
						/>
						<path
							fill="#F8CF26"
							d="M158 114c-16,0 -29,-13 -29,-29 0,-16 13,-29 29,-29 16,0 28,13 28,29 0,16 -12,29 -28,29z"
						/>
						<path
							fill="#ED1C24"
							d="M414 93l-148 0c-5,0 -8,-4 -8,-8 0,-4 3,-8 8,-8l148 0c5,0 8,4 8,8 0,4 -3,8 -8,8z"
						/>
						<g>
							<g>
								<path
									fill="#0071BC"
									d="M122 201l0 0 0 0 0 95 95 0 0 0 0 0c0,52 -43,94 -95,94 -52,0 -95,-42 -95,-94 0,-53 43,-95 95,-95z"
								/>
								<path
									fill="#39B54A"
									d="M166 156l0 0c53,0 95,43 95,95l0 0 -95 0 0 -95z"
								/>
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
								<path
									fill="#29485A"
									d="M477 455l-297 0c-5,0 -8,-4 -8,-8 0,-4 3,-8 8,-8l297 0c4,0 8,4 8,8 0,4 -4,8 -8,8z"
								/>
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
			<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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
			{
				id: '01',
				name: 'All Games',
				icon: (
					<svg
						viewBox="0 0 16 16"
						xmlns="http://www.w3.org/2000/svg"
						fill="#aeafc7"
						stroke="#aeafc7"
					>
						<g strokeWidth="0" />
						<g strokeLinecap="round" strokeLinejoin="round" />
						<g>
							<g fill="#a8a8a8" strokeWidth=".82858px" color="#a1a1a1">
								<path
									d="M8.04 10.471 2.938 7.953l2.085-1.03-.932-.46-3.017 1.49L8.04 11.39l6.965-3.437-3.017-1.49-.93.46 2.084 1.03z"
									transform="matrix(1.1485 0 0 1.2471 -1.233 -1.917)"
								/>
								<path
									d="M8.04 13.448 2.938 10.93 5.023 9.9l-.932-.46-3.017 1.49 6.966 3.437 6.965-3.437-3.017-1.49-.93.46 2.084 1.03z"
									transform="matrix(1.1485 0 0 1.2471 -1.233 -1.917)"
								/>
								<path
									d="M8.04 1.537 1.074 4.974 8.04 8.41l6.965-3.437zm0 .919 5.102 2.518L8.04 7.492 2.938 4.974z"
									transform="matrix(1.1485 0 0 1.2471 -1.233 -1.917)"
								/>
							</g>
						</g>
					</svg>
				),
				link: '/games/all',
			},
			{
				id: '02',
				name: 'Add Game',
				icon: (
					<svg
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 580.115 580.115"
						enableBackground="new 0 0 580.115 580.115"
						xmlSpace="preserve"
					>
						<g>
							<g>
								<path
									d="M443.565,221.25c25.649,0,49.835,6.304,71.164,17.381c-11.646-59.878-32.858-109.56-45.38-130.307
             c-19.896-32.962-92.945-54.633-116.696-30.882c-23.752,23.752-91.158,21.383-91.158,21.383s-67.406,2.375-91.157-21.377
             c-23.752-23.752-96.8-2.081-116.696,30.881C33.752,141.287-8.121,247.297,1.383,351.222
             c9.504,103.924,58.201,70.668,97.987,38.005c39.786-32.662,52.858-61.169,162.125-61.169c12.748,0,24.137,0.403,34.456,1.138
             C315.896,266.667,374.514,221.25,443.565,221.25z"
								/>
								<path
									d="M518.688,262.145c-21.548-14.229-47.362-22.534-75.123-22.534c-59.603,0-110.252,38.201-128.887,91.439
             c-4.945,14.125-7.662,29.297-7.662,45.11c0,75.417,61.133,136.55,136.549,136.55c75.417,0,136.55-61.139,136.55-136.55
             C580.115,328.504,555.69,286.576,518.688,262.145z M529.209,397.623c0,3.379-2.735,6.12-6.12,6.12h-14.217h-31.609
             c-3.379,0-6.12,2.742-6.12,6.12v9.565v36.255c0,3.379-2.742,6.12-6.12,6.12h-42.926c-3.378,0-6.12-2.741-6.12-6.12v-45.826
             c0-3.378-2.741-6.12-6.12-6.12h-45.82c-3.384,0-6.12-2.741-6.12-6.12v-42.919c0-3.379,2.736-6.12,6.12-6.12h8.647h37.18
             c3.378,0,6.119-2.742,6.119-6.12v-45.827c0-3.378,2.742-6.119,6.12-6.119h42.926c3.379,0,6.12,2.741,6.12,6.119v45.827
             c0,3.378,2.742,6.12,6.12,6.12h44.541h1.279c3.385,0,6.12,2.741,6.12,6.12V397.623z"
								/>
							</g>
						</g>
					</svg>
				),
				link: '/games/add',
			},
		],
	},

	{
		id: '0003',
		name: 'Tags',
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42">
				<path
					fill="#d3d4ed"
					d="M39,0H22.86a5,5,0,0,0-3.54,1.46L1.46,19.32a5,5,0,0,0,0,7.07L15.61,40.54a5,5,0,0,0,7.07,0L40.54,22.68A5,5,0,0,0,42,19.14V3A3,3,0,0,0,39,0ZM31,15a4,4,0,1,1,4-4A4,4,0,0,1,31,15Z"
				/>
			</svg>
		),
		link: '/tags',
	},

	{
		id: '0005',
		name: 'Events',
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
				<g data-name="Layer 40">
					<path
						fill="#ccc"
						d="M52.55,4.39H49.16a.61.61,0,0,0-.56.81c.1,0,0,3.63,0,3.74a.59.59,0,0,0,.6.65h3.29a2.41,2.41,0,0,1,2.4,2.4V53.08a2.41,2.41,0,0,1-2.4,2.4H11.45a2.41,2.41,0,0,1-2.4-2.4V12a2.41,2.41,0,0,1,2.4-2.4h3.31a.6.6,0,0,0,.6-.6c0-.07,0-3.85.05-3.79a.61.61,0,0,0-.56-.81h-3.4A7.61,7.61,0,0,0,3.85,12V53.08a7.61,7.61,0,0,0,7.6,7.6h41.1a7.61,7.61,0,0,0,7.6-7.6V12A7.61,7.61,0,0,0,52.55,4.39Z"
					/>
					<rect fill="#e6e6e6" x="7.85" y="8.39" width="48.29" height="48.29" rx="3.6" />
					<path
						fill="#e4202b"
						d="M52.54,8.39H11.45A3.61,3.61,0,0,0,7.85,12v4.94a.6.6,0,0,0,.6.6H55.54a.6.6,0,0,0,.6-.6V12A3.61,3.61,0,0,0,52.54,8.39Z"
					/>
					<path
						fill="#e6e6e6"
						d="M16.9,3.32A2.29,2.29,0,0,0,14.16,5.5v7c0,2.95,4.91,2.95,4.93,0v-7A2.19,2.19,0,0,0,16.9,3.32Z"
					/>
					<path
						fill="#e6e6e6"
						d="M32.28,3.32A2.29,2.29,0,0,0,29.54,5.5v7c0,2.95,4.91,2.95,4.93,0v-7A2.19,2.19,0,0,0,32.28,3.32Z"
					/>
					<path
						fill="#e6e6e6"
						d="M47.66,3.32A2.3,2.3,0,0,0,44.91,5.5v7c0,2.95,4.92,2.95,4.94,0v-7A2.19,2.19,0,0,0,47.66,3.32Z"
					/>
					<path
						fill="#333132"
						d="M31.58,27.16a.62.62,0,0,0,.84,0L38.1,21.7a.6.6,0,0,0-.84-.86L32,25.89l-5.26-5.05c-.56-.55-1.41.33-.84.86Z"
					/>
					<path
						fill="#333132"
						d="M40.6,50.74,38.38,45a.61.61,0,0,0-.56-.38H26.18a.61.61,0,0,0-.56.38L23.4,50.74a.59.59,0,0,0,.34.77.6.6,0,0,0,.78-.34l2.07-5.34H37.41l2.07,5.34A.6.6,0,0,0,40.6,50.74Z"
					/>
					<rect fill="#d29c6d" x="16.56" y="26.13" width="30.88" height="19.7" rx="2.6" />
					<path
						fill="#0097ce"
						d="M15.9,21.72c-.89,0-.53-1.26-.6-1.87a.6.6,0,0,1,.6-.6c.89,0,.53,1.25.6,1.87A.6.6,0,0,1,15.9,21.72Z"
					/>
					<path
						fill="#0097ce"
						d="M15.9,26.56c-.89,0-.53-1.25-.6-1.87a.6.6,0,0,1,.6-.6c.89,0,.53,1.26.6,1.87A.6.6,0,0,1,15.9,26.56Z"
					/>
					<path
						fill="#0097ce"
						d="M17.15,22.24a.61.61,0,0,1-.42-1c.45-.36,1.09-1.51,1.74-.89s-.54,1.28-.89,1.74A.61.61,0,0,1,17.15,22.24Z"
					/>
					<path
						fill="#0097ce"
						d="M18.94,23.49H17.67a.6.6,0,0,1,0-1.2h1.27A.6.6,0,0,1,18.94,23.49Z"
					/>
					<path
						fill="#0097ce"
						d="M18.05,25.63a.59.59,0,0,1-.43-.17c-.35-.46-1.51-1.09-.89-1.74s1.29.53,1.74.89A.6.6,0,0,1,18.05,25.63Z"
					/>
					<path
						fill="#0097ce"
						d="M13.75,25.63a.6.6,0,0,1-.42-1c.45-.36,1.09-1.51,1.74-.89a.6.6,0,0,1,0,.84C14.81,24.76,14.13,25.69,13.75,25.63Z"
					/>
					<path
						fill="#0097ce"
						d="M14.13,23.49H12.86a.6.6,0,0,1,0-1.2h1.27A.6.6,0,0,1,14.13,23.49Z"
					/>
					<path
						fill="#0097ce"
						d="M14.65,22.24c-.38.05-1.07-.88-1.32-1.08a.58.58,0,0,1,0-.84c.64-.62,1.28.53,1.74.89A.61.61,0,0,1,14.65,22.24Z"
					/>
					<path
						fill="#0097ce"
						d="M16.43,49c-.89,0-.53-1.24-.6-2a.6.6,0,0,1,.6-.6c.89,0,.53,1.24.6,2A.6.6,0,0,1,16.43,49Z"
					/>
					<path
						fill="#0097ce"
						d="M16.43,54.26c-.89,0-.53-1.24-.6-2a.6.6,0,0,1,.6-.6c.89,0,.53,1.24.6,2A.6.6,0,0,1,16.43,54.26Z"
					/>
					<path
						fill="#0097ce"
						d="M17.8,49.53a.6.6,0,0,1-.43-1c.55-.45,1.18-1.6,1.83-1s-.53,1.28-1,1.82A.58.58,0,0,1,17.8,49.53Z"
					/>
					<path
						fill="#0097ce"
						d="M19.75,50.9c-.74-.07-1.95.29-2-.6s1.24-.53,2-.6A.6.6,0,0,1,19.75,50.9Z"
					/>
					<path
						fill="#0097ce"
						d="M18.78,53.25a.63.63,0,0,1-.43-.17c-.44-.55-1.59-1.18-1-1.83s1.29.53,1.83,1A.6.6,0,0,1,18.78,53.25Z"
					/>
					<path
						fill="#0097ce"
						d="M14.08,53.25a.6.6,0,0,1-.43-1c.55-.45,1.18-1.6,1.83-1s-.53,1.28-1,1.83A.63.63,0,0,1,14.08,53.25Z"
					/>
					<path
						fill="#0097ce"
						d="M14.49,50.9c-.74-.07-2,.29-2-.6s1.25-.53,2-.6A.6.6,0,0,1,14.49,50.9Z"
					/>
					<path
						fill="#0097ce"
						d="M15.06,49.53a.6.6,0,0,1-.43-.18c-.44-.54-1.59-1.17-1-1.82s1.29.53,1.83,1A.6.6,0,0,1,15.06,49.53Z"
					/>
					<path
						fill="#0097ce"
						d="M49.79,22.73c-.89,0-.53-1.25-.6-1.87a.6.6,0,0,1,.6-.6c.89,0,.53,1.26.6,1.87A.6.6,0,0,1,49.79,22.73Z"
					/>
					<path
						fill="#0097ce"
						d="M49.79,27.57c-.89,0-.53-1.25-.6-1.86a.6.6,0,0,1,.6-.6c.89,0,.53,1.25.6,1.86A.6.6,0,0,1,49.79,27.57Z"
					/>
					<path
						fill="#0097ce"
						d="M51,23.25a.6.6,0,0,1-.42-1c.45-.36,1.09-1.52,1.74-.9s-.54,1.29-.9,1.74A.58.58,0,0,1,51,23.25Z"
					/>
					<path
						fill="#0097ce"
						d="M52.82,24.5H51.56a.6.6,0,0,1,0-1.2h1.26A.6.6,0,0,1,52.82,24.5Z"
					/>
					<path
						fill="#0097ce"
						d="M51.94,26.65c-.38.06-1.07-.87-1.32-1.07a.59.59,0,0,1,0-.85c.64-.62,1.28.54,1.74.89A.61.61,0,0,1,51.94,26.65Z"
					/>
					<path
						fill="#0097ce"
						d="M47.64,26.65a.61.61,0,0,1-.42-1c.45-.35,1.09-1.51,1.74-.89s-.54,1.29-.89,1.74A.61.61,0,0,1,47.64,26.65Z"
					/>
					<path
						fill="#0097ce"
						d="M48,24.5H46.75a.6.6,0,0,1,0-1.2H48A.6.6,0,0,1,48,24.5Z"
					/>
					<path
						fill="#0097ce"
						d="M48.54,23.25a.6.6,0,0,1-.43-.18c-.36-.45-1.51-1.09-.89-1.74s1.28.54,1.74.9A.6.6,0,0,1,48.54,23.25Z"
					/>
					<path
						fill="#0097ce"
						d="M49.61,47.92a.6.6,0,0,1-.6-.6V45.84a.6.6,0,0,1,1.2,0v1.48A.6.6,0,0,1,49.61,47.92Z"
					/>
					<path
						fill="#0097ce"
						d="M49.61,53.57A.6.6,0,0,1,49,53V51.49a.6.6,0,1,1,1.2,0V53A.6.6,0,0,1,49.61,53.57Z"
					/>
					<path
						fill="#0097ce"
						d="M51.07,48.52a.6.6,0,0,1-.42-1l1-1a.61.61,0,0,1,.85,0,.59.59,0,0,1,0,.85l-1,1.05A.63.63,0,0,1,51.07,48.52Z"
					/>
					<path
						fill="#0097ce"
						d="M53.16,50H51.68a.6.6,0,0,1-.6-.6.6.6,0,0,1,.6-.6h1.48A.6.6,0,0,1,53.16,50Z"
					/>
					<path
						fill="#0097ce"
						d="M52.12,52.49a.6.6,0,0,1-.43-.18l-1-1a.6.6,0,0,1,.85-.85l1,1A.6.6,0,0,1,52.12,52.49Z"
					/>
					<path
						fill="#0097ce"
						d="M47.11,52.49a.6.6,0,0,1-.43-1l1-1a.61.61,0,0,1,.85,0,.6.6,0,0,1,0,.85l-1,1A.59.59,0,0,1,47.11,52.49Z"
					/>
					<path
						fill="#0097ce"
						d="M47.54,50H46.07a.6.6,0,0,1-.6-.6.6.6,0,0,1,.6-.6h1.47A.6.6,0,0,1,47.54,50Z"
					/>
					<path
						fill="#0097ce"
						d="M48.15,48.52a.61.61,0,0,1-.42-.17l-1-1.05a.6.6,0,0,1,.85-.85l1,1A.6.6,0,0,1,48.15,48.52Z"
					/>
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
			{
				id: '01',
				name: 'Slider',
				icon: (
					<svg
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						x="0px"
						y="0px"
						viewBox="0 0 32 32"
						enableBackground="new 0 0 32 32"
						xmlSpace="preserve"
					>
						<polyline
							fill="none"
							stroke="rgb(210, 207, 230)"
							strokeWidth={2}
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeMiterlimit={10}
							points="25,11 27,13 25,15 "
						/>
						<polyline
							fill="none"
							stroke="rgb(210, 207, 230)"
							strokeWidth={2}
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeMiterlimit={10}
							points="7,11 5,13 7,15"
						/>
						<path
							fill="none"
							stroke="rgb(210, 207, 230)"
							strokeWidth={2}
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeMiterlimit={10}
							d="M29,23H3c-1.1,0-2-0.9-2-2V5c0-1.1,0.9-2,2-2h26c1.1,0,2,0.9,2,2v16C31,22.1,30.1,23,29,23z"
						/>
						<circle
							fill="none"
							stroke="rgb(210, 207, 230)"
							strokeWidth={2}
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeMiterlimit={10}
							cx="16"
							cy="28"
							r="1"
						/>
						<circle
							fill="none"
							stroke="rgb(210, 207, 230)"
							strokeWidth={2}
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeMiterlimit={10}
							cx="10"
							cy="28"
							r="1"
						/>
						<circle
							fill="none"
							stroke="rgb(210, 207, 230)"
							strokeWidth={2}
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeMiterlimit={10}
							cx="22"
							cy="28"
							r="1"
						/>
					</svg>
				),

				link: '/games/all',
			},
			{
				id: '02',
				name: 'Sale',
				icon: (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						xmlSpace="preserve"
						width="655.359"
						height="655.359"
						shapeRendering="geometricPrecision"
						textRendering="geometricPrecision"
						imageRendering="optimizeQuality"
						fillRule="evenodd"
						clipRule="evenodd"
						viewBox="0 0 6.827 6.827"
					>
						<g>
							<g>
								<g>
									<path
										fill="#fec245"
										d="M1.327 3.272a.067.067 0 0 1-.043-.117L3.122 1.56a.067.067 0 1 1 .087.1L1.371 3.256a.066.066 0 0 1-.044.017z"
									/>
									<path
										fill="#fec245"
										d="M5.5 3.272a.066.066 0 0 1-.043-.017L3.618 1.661a.067.067 0 0 1 .088-.101l1.838 1.595a.067.067 0 0 1-.044.117z"
									/>
									<path fill="#be1e2d" d="M1.013 3.055h4.8v2.713h-4.8z" />
									<path fill="#eac8c8" d="M1.326 3.339H5.5v2.144H1.326z" />
									<path
										fill="#212121"
										d="m1.883 4.601.15-.014c.01.05.028.087.056.111a.166.166 0 0 0 .111.035c.05 0 .088-.01.113-.031a.094.094 0 0 0 .038-.074.07.07 0 0 0-.016-.046.127.127 0 0 0-.056-.033 1.91 1.91 0 0 0-.123-.034.42.42 0 0 1-.175-.076.2.2 0 0 1-.037-.263.207.207 0 0 1 .096-.077.382.382 0 0 1 .15-.027c.096 0 .168.02.217.063a.223.223 0 0 1 .076.169l-.154.007c-.007-.04-.021-.068-.043-.085-.021-.018-.054-.026-.097-.026-.045 0-.08.01-.106.028a.059.059 0 0 0-.002.094c.02.016.067.033.143.05a.75.75 0 0 1 .166.056.215.215 0 0 1 .085.078c.02.032.03.073.03.122a.226.226 0 0 1-.14.208.433.433 0 0 1-.166.028.331.331 0 0 1-.223-.067.292.292 0 0 1-.093-.196z"
									/>
									<path
										fill="#212121"
										d="M3.431 4.85h-.168l-.066-.173H2.89l-.063.173h-.164l.298-.765h.163l.306.765zm-.284-.302-.105-.284-.104.284h.21z"
									/>
									<path
										fill="#212121"
										d="M3.624 4.85v-.759h.155v.63h.384v.13h-.539z"
									/>
									<path
										fill="#212121"
										d="M4.38 4.85v-.765h.567v.13h-.413v.17h.384v.128h-.384v.208h.427v.13H4.38z"
									/>
									<g>
										<ellipse
											cx="3.413"
											cy="1.426"
											rx=".366"
											ry=".367"
											fill="#465b65"
										/>
									</g>
									<g>
										<circle cx="3.413" cy="1.426" fill="#556f7a" r=".293" />
									</g>
								</g>
							</g>
						</g>
						<path fill="none" d="M0 0h6.827v6.827H0z" />
					</svg>
				),
				link: '/games/add',
			},
			{
				id: '03',
				name: 0,
				icon: (
					<svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M24 128C24 70.5624 70.5624 24 128 24H384C441.438 24 488 70.5624 488 128V384C488 441.438 441.438 488 384 488H128C70.5624 488 24 441.438 24 384V128ZM128 40C79.3989 40 40 79.3989 40 128V384C40 432.601 79.3989 472 128 472H384C432.601 472 472 432.601 472 384V128C472 79.3989 432.601 40 384 40H128ZM100 208C100 196.954 108.954 188 120 188H160C166.627 188 172 193.373 172 200C172 206.627 166.627 212 160 212H124V240H154C160.627 240 166 245.373 166 252C166 258.627 160.627 264 154 264H124V304C124 310.627 118.627 316 112 316C105.373 316 100 310.627 100 304V252V208ZM288 188C276.954 188 268 196.954 268 208V252V296C268 307.046 276.954 316 288 316H328C334.627 316 340 310.627 340 304C340 297.373 334.627 292 328 292H292V264H322C328.627 264 334 258.627 334 252C334 245.373 328.627 240 322 240H292V212H328C334.627 212 340 206.627 340 200C340 193.373 334.627 188 328 188H288ZM348 208C348 196.954 356.954 188 368 188H408C414.627 188 420 193.373 420 200C420 206.627 414.627 212 408 212H372V240H402C408.627 240 414 245.373 414 252C414 258.627 408.627 264 402 264H372V292H408C414.627 292 420 297.373 420 304C420 310.627 414.627 316 408 316H368C356.954 316 348 307.046 348 296V252V208ZM200 188C188.954 188 180 196.954 180 208V252V304C180 310.627 185.373 316 192 316C198.627 316 204 310.627 204 304V264H216.322L237.104 309.029C239.882 315.046 247.011 317.673 253.029 314.896C259.046 312.118 261.673 304.989 258.896 298.971L240.831 259.831C252.233 253.79 260 241.802 260 228V226C260 205.013 242.987 188 222 188H200ZM224 240H204V212H222C229.732 212 236 218.268 236 226V228C236 234.627 230.627 240 224 240Z"
							fill="url(#paint0_linear)"
						/>
						<defs>
							<linearGradient
								id="paint0_linear"
								x1="64"
								y1="64"
								x2="448"
								y2="448"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#FF003D" />
								<stop offset="1" stopColor="#3D00EB" />
							</linearGradient>
						</defs>
					</svg>
				),
				link: '/games/add',
			},
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
];

function Drawer() {
	const [collapse, setCollapse] = useState(false);
	const [transition, setTransition] = useState(false);
	const collapseRef = useRef(collapse);
	collapseRef.current = collapse;

	const screenWidth = useScreenWidth();
	const scrollParentRef = useRef(null);
	const scrollChildRef = useRef(null);
	const elementRef = useRef(null);
	const transitionId = useRef(null);
	const handleTransition = () => {
		setTransition(true);
		if (transitionId.current) {
			clearTimeout(transitionId.current);
			transitionId.current = null;
		}
		transitionId.current = setTimeout(() => {
			setTransition(false);
			transitionId.current = null;
		}, 300);
	};
	const { showMenu, setElement } = useDropDownHide(() => {
		setCollapse(false);
		handleTransition();
	});

	useEffect(() => {
		if (screenWidth < 1100 && collapseRef.current) {
			setCollapse(false);
		}
	}, [screenWidth]);

	useEffect(() => {
		setElement(elementRef.current);
	}, [setElement]);

	return (
		<>
			<div
				className={`${collapse ? `${styles.containerCollapse} ` : ''}${transition ? `${styles.containerTransition} ` : ''}${styles.drawerContainer}`}
				ref={elementRef}
			>
				<div className={styles.drawerImmediateContainer}>
					<div className={styles.drawerScrollContainer}>
						<div className={styles.drawer} ref={scrollParentRef}>
							<ul className={styles.optionContainer} ref={scrollChildRef}>
								{drawers.map(drawer => (
									<DrawerOptions
										{...(screenWidth > 1099 && { parentState: collapse })}
										key={drawer.id}
										option={drawer}
									/>
								))}
							</ul>

							<footer
								className={`${collapse && screenWidth > 1099 ? `${styles.footerHide} ` : ''}${styles.footer}`}
							>
								<ol className={styles.footerLinks}>
									{[
										{ text: 'Privacy Policy', link: 'privacyPolicy' },
										{ text: 'Cookie Policy', link: 'cookiePolicy' },
										{ text: 'Terms of Service', link: 'termsOfService' },
										{ text: 'IR Contacts', link: 'IRContacts' },
										{
											text: 'Information Security',
											link: 'informationSecurity',
										},
									].map(link => (
										<li className={styles.footerLinkContainer} key={link.link}>
											<a className={styles.footerLink} href={link.link}>
												{link.text}
											</a>
										</li>
									))}
								</ol>

								<p className={styles.footerCopyWrite}>
									<small>
										&copy;2024{' '}
										<span className={styles.gamologyText}>Gamology</span>
									</small>
								</p>
							</footer>
						</div>
						<ScrollBar childRef={scrollChildRef} parentRef={scrollParentRef} />
					</div>
				</div>
				<button
					className={`${collapse ? styles.collapsePosition : styles.expandedPosition} ${styles.collapseButton}`}
					onClick={() => {
						setCollapse(prev => {
							if (!prev && screenWidth < 1100) {
								showMenu();
							}
							return !prev;
						});
						handleTransition();
					}}
					type="button"
				>
					<span className={styles.arrowBtn} />
				</button>
			</div>

			{screenWidth < 1100 && <ScreenShadow show={collapse} zIndex={1} />}
		</>
	);
}
export default Drawer;
