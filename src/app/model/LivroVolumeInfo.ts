import { ImageLinks } from "./Interfaces";

export class LivroVolumeInfo{
    title?:               string;
    authors?:             string[];
    publisher?:           string;
    publishedDate?:       string;
    description?:         string;
    thumbnail?:           ImageLinks;
    previewLink?:         string;

    constructor(item){
        this.title = item.volumeInfo?.title,
        this.authors = item.volumeInfo?.authors,
        this.publisher = item.volumeInfo?.publisher,
        this.publishedDate = item.volumeInfo?.publishedDate,
        this.description = item.volumeInfo?.description,
        this.thumbnail = item.volumeInfo?.imageLinks?.thumbnail,
        this.previewLink = item.volumeInfo?.previewLink
    }
}