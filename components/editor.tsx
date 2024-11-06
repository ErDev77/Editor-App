"use client";

import { ModeToggle } from "./theme/mode-toggle";
import Layers from "./layers/layers";
import UploadImage from "./upload/upload-image";
import ActiveImage from "./active-image";
import UploadForm from "./upload/upload-form";
import { useLayerStore } from "@/lib/layer-store";
import ImageTools from "./toolbar/image-toolbar";
import Loading from "./loading";
import VideoTools from "./toolbar/video-toolbar";
import ExportAsset from "./toolbar/export";

export default function Editor() {
    const activeLayer = useLayerStore((state) => state.activeLayer)
    return (
			<div className='flex h-full'>
				<div className='py-6 px-4 basis-[240px] shrink-0'>
					<div className='pb-12 text-center'>
						<ModeToggle />
					</div>
					<div className='flex flex-col gap-4'>
						{activeLayer.resourceType === 'image' ? <ImageTools /> : null}
						{activeLayer.resourceType === 'video' ? <VideoTools /> : null}
                        <ExportAsset  resource={activeLayer.resourceType!}/>
					</div>
				</div>
				<Loading />
				<UploadForm />
				<ActiveImage />
				<Layers />
			</div>
		)

}