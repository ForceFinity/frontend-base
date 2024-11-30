import MainNav from '@/components/MainNav';
import Mapcomponent from '@/components/ui/mapcomponent';
import PopupTime from '@/components/ui/popupTime';
import PopupPath from '@/components/ui/popupPath';



function App() {

  return (
    <div className="flex flex-col h-screen">
      <MainNav/>
      <Mapcomponent/>
      <PopupPath/>
    </div>
  );
}

export default App;
