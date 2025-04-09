import SelectionFieldTextField from '../SelectionFieldTextField/SelectionFieldTextField';

const listArr = [
	'CPU',
	'Memory',
	'GPU',
	'Storage',
	'VRM',
	'DirectX',
	'Resolution',
	'Preset / Target',
	'Peripherals',
	'Others',
];

export default function SectionFieldTextFieldContainer({
	requiredLength,
	index,
	parentIndex,
	name,
	handleSetState,
	selectedKeys,
	parentErrorShow,
	errorMessage = [],
	errorChange,
	setHideParentErrorShow,
	enabled,
	defaultData,
}) {
	return (
		<>
			{[...Array(requiredLength).keys()].map((length, i) => (
				<SelectionFieldTextField
					enabled={enabled}
					errorChange={errorChange}
					errorMessage={errorMessage[i]}
					handleSetState={handleSetState}
					i={i}
					index={index}
					key={length}
					length={length}
					listArr={listArr}
					name={name}
					parentErrorShow={parentErrorShow}
					parentIndex={parentIndex}
					selectedKeys={selectedKeys}
					setHideParentErrorShow={setHideParentErrorShow}
					{...(defaultData && { defaultData: defaultData[i]?.[index] })}
				/>
			))}
		</>
	);
}
