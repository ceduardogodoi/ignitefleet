import { IconBox, IconBoxProps } from '../IconBox';
import { Container, Info, Label, Description } from './styles';

type LocationInfoProps = {
  label: string;
  description: string;
}

type Props = LocationInfoProps & {
  icon: IconBoxProps;
};

export function LocationInfo({ label, description, icon: Icon }: Props) {
  return (
    <Container>
      <IconBox
        icon={Icon}
      />

      <Info>
        <Label numberOfLines={1}>
          {label}
        </Label>

        <Description numberOfLines={1}>
          {description}
        </Description>
      </Info>
    </Container>
  );
}
