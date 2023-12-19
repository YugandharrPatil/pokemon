import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "./pagination";
import PokemonList from "./pokemon-list";

export default function App() {
	const [pokemon, setPokemon] = useState([]);
	const [currentPageURL, setCurrentPageURL] = useState("https://pokeapi.co/api/v2/pokemon");
	const [nextPageURL, setNextPageURL] = useState();
	const [prevPageURL, setPrevPageURL] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let cancel;
		setLoading(true);
		axios
			.get(currentPageURL, {
				cancelToken: new axios.CancelToken((c) => (cancel = c)),
			})
			.then((res) => {
				setLoading(false);
				setNextPageURL(res.data.next);
				setPrevPageURL(res.data.previous);
				setPokemon(res.data.results.map((p) => p.name));
			});

		// this is something special. You can return to useEffect and this function runs every time this useEffect runs again. Here, will use it to clean up the last call.
		return () => cancel();
	}, [currentPageURL]);

	if (loading) return "Loading...";

	const gotoNextPage = () => {
		setCurrentPageURL(nextPageURL);
	};

	const gotoPrevPage = () => {
		setCurrentPageURL(prevPageURL);
	};

	return (
		<>
			<PokemonList pokemon={pokemon} />
			<Pagination gotoNextPage={nextPageURL ? gotoNextPage : null} gotoPrevPage={prevPageURL ? gotoPrevPage : null} />
		</>
	);
}
