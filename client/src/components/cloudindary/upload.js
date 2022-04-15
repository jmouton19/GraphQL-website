export function showUploadWidget() {
  window.cloudinary.openUploadWidget(
    {
      cloudName: 'de7amnbmo',
      uploadPreset: 'ygjqbqpx',
      resourceType: 'video',
      clientAllowedFormats: ['video'],
      sources: ['local', 'url'],
      showAdvancedOptions: true,
      cropping: true,
      multiple: false,
      defaultSource: 'local',
      styles: {
        palette: {
          window: '#000000',
          sourceBg: '#000000',
          windowBorder: '#8E9FBF',
          tabIcon: '#FFFFFF',
          inactiveTabIcon: '#8E9FBF',
          menuIcons: '#FFC619',
          link: '#FFC619',
          action: '#FFC619',
          inProgress: '#FFC619',
          complete: '#33ff00',
          error: '#EA2727',
          textDark: '#000000',
          textLight: '#FFFFFF',
        },
        fonts: {
          default: null,
          "'Space Mono', monospace": {
            url: 'https://fonts.googleapis.com/css?family=Space+Mono',
            active: true,
          },
        },
      },
    },
    (err, info) => {
      if (!err) {
        if (info.event === 'success') {
          alert(`Send this public ID to backend: ${info.info.public_id}`);
        }
      }
    }
  );
}
