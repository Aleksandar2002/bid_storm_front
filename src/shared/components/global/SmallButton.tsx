import Button from "./Button";

type SmallButtonProps = {
  text: string;
  btnClass?: string;
  onClick: () => void;
};

const SmallButton = ({ text, btnClass, onClick }: SmallButtonProps) => {
  return (
    <div>
      <Button
        text={text}
        handleClickFunction={onClick}
        btnClass={btnClass + " small-button"}
      />
    </div>
  );
};
export default SmallButton;
