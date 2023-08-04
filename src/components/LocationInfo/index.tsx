import { Container, Info, Label, Description } from './styles';

type LocationInfoProps = {
  label: string;
  description: string;
}

type Props = LocationInfoProps;

export function LocationInfo({ label, description }: Props) {
  return (
    <Container>
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
