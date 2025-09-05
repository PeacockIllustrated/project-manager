
import React, { useMemo } from 'react';
import { Document as DocType } from '../../../types';
import { FileTextIcon, DownloadIcon, FolderIcon } from '../../icons/Icons.tsx';
import Placeholder from '../../ui/Placeholder';

interface DocumentsTabProps {
  documents: DocType[];
}

const DocumentsTab: React.FC<DocumentsTabProps> = ({ documents }) => {
    const { images, otherDocs } = useMemo(() => {
        const images = documents.filter(d => d.fileType.startsWith('image/'));
        const otherDocs = documents.filter(d => !d.fileType.startsWith('image/'));
        return { images, otherDocs };
    }, [documents]);

    if (documents.length === 0) {
        return <Placeholder icon={<FolderIcon />} title="No Documents" message="No documents or photos have been uploaded for this project yet."/>
    }

    return (
        <div className="space-y-8">
            {images.length > 0 && (
                <div>
                    <h3 className="text-lg font-bold text-brand-charcoal mb-3">Photos</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map(image => (
                            <a href={image.url} target="_blank" rel="noopener noreferrer" key={image.id} className="group relative aspect-square block w-full bg-brand-gray rounded-lg overflow-hidden">
                                <img src={image.url} alt={image.name} className="object-cover w-full h-full" />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                                    <p className="text-white text-xs text-center p-2 opacity-0 group-hover:opacity-100 transition-opacity break-all">{image.name}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {otherDocs.length > 0 && (
                 <div>
                    <h3 className="text-lg font-bold text-brand-charcoal mb-3">Documents</h3>
                    <div className="bg-brand-light-gray/60 rounded-lg">
                        <ul className="divide-y divide-brand-gray">
                            {otherDocs.map(doc => (
                                <li key={doc.id} className="flex items-center justify-between p-3">
                                    <div className="flex items-center space-x-3 min-w-0">
                                        <FileTextIcon className="w-5 h-5 text-brand-text flex-shrink-0" />
                                        <span className="truncate text-sm font-medium text-brand-charcoal">{doc.name}</span>
                                    </div>
                                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="ml-4 flex-shrink-0 text-brand-teal hover:text-brand-charcoal p-1 rounded-full hover:bg-brand-gray">
                                        <DownloadIcon className="w-5 h-5" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentsTab;