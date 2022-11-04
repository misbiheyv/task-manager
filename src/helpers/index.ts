export { 

    intoIter 

} from "./into-iter";


export function randomUuid() : string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
		var r = Math.random() * 16 | 0;
		var v = c == 'y' ? (r & 0x3 | 0x8) : r;
		return v.toString(16);
	});
}