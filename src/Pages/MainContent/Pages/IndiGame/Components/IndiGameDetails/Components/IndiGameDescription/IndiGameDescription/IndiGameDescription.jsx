import IndiGameSortDescription from '../Components/IndiGameSortDescription/IndiGameSortDescription';
import IndiGameTags from '../Components/IndiGameTags/IndiGameTags';
import IndiGameTextDescription from '../Components/IndiGameTextDescription/IndiGameTextDescription';
import styles from './IndiGameDescription.module.css';

const sortDesc =
	'In Marvel’s Spider-Man Remastered, the worlds of Peter Parker and Spider-Man collide in an original, action-packed story. Play as an experienced Peter Parker, fighting big crime and iconic villains in Marvel’s New York. Web-swing through vibrant neighborhoods and defeat villains with epic takedowns.';
const genes = ['Action', 'Adventure'];
const features = ['Cloud Saves', 'Controller Support', 'Single Player'];
const descriptions = [
	{
		id: 0,
		mainHeader: "Marvel's Spider-Man Remastered Available Now on PC",
		description:
			"Developed by Insomniac Games in collaboration with Marvel, and optimized for PC by Nixxes Software, Marvel's Spider-Man Remastered on PC introduces an experienced Peter Parker who’s fighting big crime and iconic villains in Marvel’s New York. At the same time, he’s struggling to balance his chaotic personal life and career while the fate of Marvel’s New York rests upon his shoulders.",
	},
	{
		id: 1,
		mainHeader: 'Key Features',
		subHeader: 'Be Greater',
		description:
			'When iconic Marvel villains threaten Marvel’s New York, Peter Parker and Spider-Man’s worlds collide. To save the city and those he loves, he must rise up and be greater.',
	},
	{
		id: 2,
		subHeader: 'Feel like Spider-Man',
		description:
			'After eight years behind the mask, Peter Parker is a crime-fighting master. Feel the full power of a more experienced Spider-Man with improvisational combat, dynamic acrobatics, fluid urban traversal and environmental interactions.',
	},
	{
		id: 3,
		subHeader: 'Worlds collide',
		description:
			'The worlds of Peter Parker and Spider-Man collide in an original action-packed story. In this new Spider-Man universe, iconic characters from Peter and Spider-Man’s lives have been reimagined, placing familiar characters in unique roles.',
	},
	{
		id: 4,
		subHeader: 'Marvel’s New York is your playground',
		description:
			'The Big Apple comes to life in Marvel’s Spider-Man. Swing through vibrant neighborhoods and catch breathtaking views of iconic Marvel and Manhattan landmarks. Use the environment to defeat villains with epic takedowns in true blockbuster action.',
	},
	{
		id: 5,
		subHeader: 'Enjoy The City That Never Sleeps complete content',
		description:
			'Following the events of the main story of Marvel’s Spider-Man Remastered, experience the continuation of Peter Parker’s journey in Marvel’s Spider-Man: The City That Never Sleeps, three story chapters with additional missions and challenges to discover.',
	},
	{
		id: 6,
		mainHeader: 'PC Features',
		subHeader: 'PC Optimized Graphics',
		description:
			'Enjoy a variety of graphics quality options to tailor to a wide range of devices, unlocked framerates, and support for other technologies including performance boosting NVIDIA DLSS and image quality enhancing NVIDIA DLAA. Upscaling technology AMD FSR 2.0 is also supported.',
	},
	{
		id: 7,
		subHeader: 'Ray-traced reflections and improved shadows*',
		description:
			'See the city come to life with improved shadows and stunning ray-traced reflection options with a variety of quality modes to choose from.',
	},
	{
		id: 8,
		subHeader: 'Ultra-wide Monitor support**',
		description:
			'Take in the cinematic sights of Marvel’s New York with support for a range of screen setups, including 16:9, 16:10, 21:9, 32:9, and 48:9 resolutions with triple monitor setups using NVIDIA Surround or AMD Eyefinity.',
	},
	{
		id: 9,
		subHeader: 'Controls and Customization',
		description:
			'Feel what it’s like to play as Spider-Man through immersive haptic feedback and dynamic trigger effects using a PlayStation DualSense™ controller on a wired USB connection. Enjoy full mouse and keyboard support with various customizable control options.',
	},
	{ id: 10, subHeader: '*Compatible PC required.' },
	{ id: 11, subHeader: '**Compatible PC and display device required.' },
];

export default function IndiGameDescription() {
	return (
		<section className={styles.individualGameDescription}>
			<IndiGameSortDescription desc={sortDesc} />
			<IndiGameTags features={features} genes={genes} />
			<IndiGameTextDescription descriptions={descriptions} />
		</section>
	);
}
