import { useAppContext } from '../../context/AppContext';

export default function Header() {
    const { balance } = useAppContext();
  return (
    <div>{balance}</div>
  )
}
