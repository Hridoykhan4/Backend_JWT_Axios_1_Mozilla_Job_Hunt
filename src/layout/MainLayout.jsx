import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";

const MainLayout = () => {
  return (
    <>
      <header className="max-w-7xl mx-auto">
        <Navbar></Navbar>
      </header>
      <main className="min-h-[calc(100vh-289px)]">
        <Outlet></Outlet>
      </main>

    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim beatae odio expedita, inventore nemo, hic libero modi, repellat non esse eaque? Voluptatem ratione exercitationem dolores maxime ipsum, ullam laudantium maiores cumque consequuntur? Beatae, cumque animi. Voluptate perspiciatis libero ipsam, molestias corporis laborum. Nihil nobis laudantium eaque laborum consequuntur ducimus fugit cum suscipit, distinctio assumenda. Dignissimos asperiores eum, maiores et labore, ea voluptates eligendi, aliquid ipsa a maxime! Earum quidem facilis repellendus alias explicabo minus dignissimos veritatis dolores dolor ducimus cum ad, atque, quibusdam aspernatur ratione velit quod itaque qui officiis omnis sed rem? Asperiores minus deserunt officia dolores sapiente, id hic obcaecati quasi odit laborum facere ad in, magnam recusandae. Voluptatum architecto eos culpa expedita aspernatur provident ipsa, magni eaque alias reprehenderit, numquam pariatur vero quasi soluta! Quas reiciendis totam, asperiores unde aspernatur aut cupiditate porro quos doloribus ipsam ut error! Exercitationem suscipit optio impedit, dolore pariatur nihil expedita, aperiam eligendi debitis consequatur aut nostrum harum? Perspiciatis nemo impedit ad deleniti, iure quisquam quis officia ratione architecto autem aut et quod omnis sit quae, voluptates totam non. Voluptas expedita adipisci inventore maxime et ducimus similique rerum excepturi officia? Corporis, blanditiis deleniti quas unde aliquam, magni autem modi natus ex ipsum perferendis numquam? Quo magni repellat laborum praesentium illum itaque ipsa soluta facilis temporibus dignissimos atque delectus harum fugiat nam architecto quia eveniet molestias adipisci nisi dolorum vero, voluptatum libero sed. Ex quam debitis commodi deserunt? Esse magni optio atque, aliquam repudiandae distinctio et sit accusantium, consectetur consequatur deserunt. Nulla odio esse consequuntur aliquam perspiciatis beatae. Temporibus doloribus ullam dignissimos reiciendis? Libero voluptates, similique soluta delectus magnam architecto ullam vel velit, illo culpa accusantium quas voluptatibus atque cum totam assumenda natus saepe quaerat debitis quos repellat nisi. Nam neque magni eos qui nihil, repudiandae quaerat! Saepe incidunt aspernatur enim, provident corrupti veritatis quis quod quo ratione quam nisi exercitationem unde? Labore, cupiditate dolorum ullam cumque nulla, modi pariatur, ut maxime suscipit temporibus optio sequi accusantium! Vero enim reiciendis facilis? Incidunt, doloremque odio sint porro accusamus minus quo, provident eveniet aspernatur aliquid consequuntur repellat magni ratione repudiandae, excepturi pariatur id blanditiis suscipit nesciunt! Sit possimus vel neque atque nobis ut fugiat provident labore enim, necessitatibus error mollitia nisi unde consectetur, similique, dolore quae veritatis repellat quam voluptate at aliquid eaque officiis. Aliquam beatae impedit excepturi repellat eligendi quaerat ut expedita, quis optio inventore? Explicabo corporis eius magnam sint repellat, obcaecati quibusdam dolores saepe iure dignissimos, eligendi voluptas esse! Sed totam numquam est officia pariatur, neque fugiat harum debitis exercitationem velit, id necessitatibus doloribus rem voluptas ex officiis magnam? Quibusdam adipisci beatae modi omnis obcaecati odio, sunt magni doloribus quia necessitatibus nemo quos illum, laboriosam delectus dolores facere iusto ea nesciunt reiciendis voluptas nihil expedita illo amet! Alias rerum delectus deserunt est pariatur possimus dolorum nam natus illo voluptates inventore accusantium doloribus, incidunt ex quia adipisci recusandae modi voluptas consectetur architecto dolores porro maiores ea. Explicabo, eligendi adipisci qui aut, officiis quod quasi ipsa debitis saepe magnam delectus et a suscipit odit laborum.</p>

      <footer>
        <Footer></Footer>
      </footer>

    </>
  );
};

export default MainLayout;
