import {useEffect, useState} from "react";

const useNoteBoxHeight = (
	note: string | undefined,
) => {
	const [noteBoxHeight, setNoteBoxHeight] = useState<string>("10vh");

	useEffect(() => {
		if (note) {
			const noteLength = note.length;
			if (window.innerWidth < 400 && noteLength > 350) {
				setNoteBoxHeight("50vh");
			} else {
				if (noteLength <= 500) setNoteBoxHeight("10vh");
				else if (noteLength > 500 && noteLength <= 1000) setNoteBoxHeight("20vh");
				else if (noteLength > 1000) setNoteBoxHeight("25vh");
			}
		}
	}, [note]);

	return noteBoxHeight;
};

export default useNoteBoxHeight;
