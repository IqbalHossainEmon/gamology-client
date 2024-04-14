import SelectionFieldTextField from '../SelectionFieldTextField/SelectionFieldTextField';

const listArr = ['CPU', 'Memory', 'GPU', 'Storage', 'VRM', 'DirectX', 'Resolution', 'Preset / Target', 'Peripherals', 'Others'];

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
}) {
    return (
        <>
            {[...Array(requiredLength).keys()].map((length, i) => (
                <SelectionFieldTextField
                    key={length}
                    parentIndex={parentIndex}
                    name={name}
                    length={length}
                    i={i}
                    index={index}
                    handleSetState={handleSetState}
                    listArr={listArr}
                    selectedKeys={selectedKeys}
                    errorMessage={errorMessage[i]}
                    parentErrorShow={parentErrorShow}
                    errorChange={errorChange}
                    setHideParentErrorShow={setHideParentErrorShow}
                    enabled={enabled}
                />
            ))}
        </>
    );
}
