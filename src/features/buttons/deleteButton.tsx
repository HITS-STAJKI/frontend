import { Button } from "@mantine/core";
import { TrashSvgrepoCom } from "../../assets/icons";

interface ButtonProps {
    onClick: () => void;
}

export function DeleteButton({ onClick }: ButtonProps) {
       return (
        <Button color="red"  onClick={onClick} size="md" style={{ aspectRatio: '1 / 1', padding: 0 }}>
            <TrashSvgrepoCom />
        </Button>
       );
   }

