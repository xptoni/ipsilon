import { useTranslation } from "react-i18next";
import { Camera, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";

interface PhotosStepProps {
  photos: File[];
  onUpdate: (photos: File[]) => void;
}

const PhotosStep = ({ photos, onUpdate }: PhotosStepProps) => {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type.startsWith('image/')
    );
    
    const newPhotos = [...photos, ...files].slice(0, 5);
    onUpdate(newPhotos);
  }, [photos, onUpdate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(
        file => file.type.startsWith('image/')
      );
      const newPhotos = [...photos, ...files].slice(0, 5);
      onUpdate(newPhotos);
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onUpdate(newPhotos);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          {t('wizard.photosTitle')}
        </h2>
        <p className="text-muted-foreground">
          {t('wizard.photosSubtitle')}
        </p>
      </div>

      <div className="max-w-lg mx-auto space-y-4">
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center transition-all
            ${isDragging ? 'border-primary bg-primary/5' : 'border-border'}
            ${photos.length >= 5 ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
          `}
        >
          <input
            type="file"
            id="photo-upload"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={photos.length >= 5}
          />
          <label htmlFor="photo-upload" className="cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Camera className="h-8 w-8 text-primary" />
              </div>
              <p className="font-medium text-foreground mb-1">
                {t('wizard.dropPhotos')}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                {t('wizard.orClickToUpload')}
              </p>
              <Button type="button" variant="outline" size="sm" asChild>
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  {t('wizard.selectFiles')}
                </span>
              </Button>
            </div>
          </label>
        </div>

        <p className="text-sm text-muted-foreground text-center">
          {t('wizard.maxPhotos', { current: photos.length, max: 5 })}
        </p>

        {photos.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {photos.map((photo, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotosStep;
