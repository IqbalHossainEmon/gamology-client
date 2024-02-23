const systemReqMustArr = ['CPU', 'Memory', 'GPU', 'Storage'];

export default function useAddGameLogics({ gameData, errorMessages }) {
  const { gameInfo, gameBanner, gameDescriptions, gameSpecifications, gameTags } = gameData.current;

  const { gameInfoError, gameDescriptionsError, gameSpecificationsError, gameTagsError } = errorMessages.current;

  const checkValidation = () => {
    let error = false;
    // Game Info
    if (!gameInfo.name) {
      gameInfoError.name = 'Title is required';
      error = true;
    } else {
      gameInfoError.name = '';
    }
    if (!gameInfo.developer) {
      gameInfoError.developer = 'Developer is required';
      error = true;
    } else {
      gameInfoError.developer = '';
    }
    if (!gameInfo.publisher) {
      gameInfoError.publisher = 'Publisher is required';
      error = true;
    } else {
      gameInfoError.publisher = '';
    }
    if (!gameInfo.logo?.file) {
      gameInfoError.logo = 'Cover Image is required';
      error = true;
    } else {
      gameInfoError.logo = '';
    }
    if (!gameInfo.phoneLogo?.file) {
      gameInfoError.phoneLogo = 'Portrait Cover Image is required';
      error = true;
    } else {
      gameInfoError.phoneLogo = '';
    }

    // Game Banner
    errorMessages.current.gameBannerError = gameBanner.map(banner => {
      const obj = {};

      if (!banner.type && !banner.cover && !banner.thumb) {
        error = true;
        obj.cover = 'Cover image/video is required';
        obj.thumb = "Image/Video's Thumbnail image is required";
        obj.type = true;
        return obj;
      }

      if (banner.type === 'Video') {
        if (!banner.cover) {
          error = true;
          obj.cover = 'Cover video link is required';
        } else if (
          banner.cover &&
          !(
            banner.cover?.includes('.mp4') ||
            banner.cover?.includes('.webm') ||
            banner.cover?.includes('.ogg') ||
            banner.cover?.includes('.mkv') ||
            banner.cover?.includes('.avi') ||
            banner.cover?.includes('.flv') ||
            banner.cover?.includes('.wmv') ||
            banner.cover?.includes('.mov') ||
            banner.cover?.includes('.m4v')
          )
        ) {
          obj.cover = "Only video file's URL is allowed";
          error = true;
        }
        if (!banner.thumb) {
          error = true;
          obj.thumb = "Video's thumbnail image is required";
        }
      } else {
        if (!banner.cover) {
          error = true;
          obj.cover = 'Cover image is required';
        }
        if (!banner.thumb) {
          error = true;
          obj.thumb = "Video's thumbnail image is required";
        }
      }

      return obj;
    });

    // Game Tags
    if (Object.keys(gameTags.genre).length === 0) {
      gameTagsError.genre = 'Genre is required';
      error = true;
    } else {
      gameTagsError.genre = '';
    }
    if (Object.keys(gameTags.features).length === 0) {
      gameTagsError.features = 'Features is required';
      error = true;
    } else {
      gameTagsError.features = '';
    }
    if (!gameInfo.releaseDate.day || !gameInfo.releaseDate.month || !gameInfo.releaseDate.year) {
      gameTagsError.releaseDate = 'Release Date is required';
      error = true;
    } else {
      gameTagsError.releaseDate = '';
    }
    if (!gameInfo.price) {
      gameInfo.price = 0;
    }

    // Game Descriptions
    if (!gameDescriptions.sortDesc) {
      gameDescriptionsError.sortDesc = 'Short Description is required';
      error = true;
    } else {
      gameDescriptionsError.sortDesc = '';
    }
    errorMessages.current.gameDescriptionsError.descriptions = gameDescriptions.descriptions.map(desc => {
      const obj = {};
      if (desc.mainHeader === '') {
        obj.mainHeader = 'Main Header is required';
        error = true;
      } else {
        obj.mainHeader = '';
      }
      if (desc.subHeader === '') {
        obj.subHeader = 'Sub Header is required';
        error = true;
      } else {
        obj.subHeader = '';
      }
      if (desc.description === '') {
        obj.description = 'Description is required';
        error = true;
      } else {
        obj.description = '';
      }
      return obj;
    });

    // Game Specifications

    const handleFieldCheck = (systemReq, k, rec, index) => {
      if (!rec || !systemReq[index][k].value) {
        error = true;
        return "Any Required field can't be empty";
      }
      return '';
    };

    if (!gameSpecifications.spec[0].isActive && !gameSpecifications.spec[1].isActive && !gameSpecifications.spec[2].isActive) {
      gameSpecificationsError.spec[3] = 'At least One System Requirements is required';
      error = true;
    } else {
      if (gameSpecificationsError.spec[3]) gameSpecificationsError.spec.pop();

      for (let i = 0; i < 3; i++) {
        const spec = gameSpecifications.spec[i];
        gameSpecificationsError.spec[i] = { req: { min: [], rec: [] } };

        if (spec.isActive) {
          const { systemReq } = spec;
          const systemReqLength = systemReq.length;

          for (let k = 0; k < 2; k++) {
            const mustReqARr = [];
            for (let j = 0; j < systemReqLength; j++) {
              mustReqARr.push(systemReq[j][k].key);
            }
            const check = systemReqMustArr.filter(la => !mustReqARr.includes(la));

            if (check.length) {
              let result = '';
              const { length } = check;
              if (length > 2) {
                const lastItem = check.pop();
                const joined = check.join(', ');
                result = `${joined}, and ${lastItem}`;
              } else {
                result = check.join(' and ');
              }
              error = true;
              gameSpecificationsError.spec[i][k ? 'rec' : 'min'] = `${result} ${length > 1 ? 'are' : 'is'} must be filled`;
            } else {
              gameSpecificationsError.spec[i].req[k ? 'rec' : 'min'] = mustReqARr.map((...rest) => handleFieldCheck(systemReq, k, ...rest));
            }
          }
        }
      }
    }

    if (Array.isArray(gameSpecifications.others.value)) {
      if (!gameSpecifications.others.value[0]) {
        error = true;
        gameSpecificationsError.others[0] = 'Text Language Supported is required';
      } else {
        gameSpecificationsError.others[0] = '';
      }
      if (!gameSpecifications.others.value[1]) {
        error = true;
        gameSpecificationsError.others[1] = 'Audio Language Supported is required';
      } else {
        gameSpecificationsError.others[1] = '';
      }
    } else if (!gameSpecifications.others.value) {
      error = true;
      gameSpecificationsError.others[0] = 'Language Support is required';
    } else {
      gameSpecificationsError.others[0] = '';
    }
    if (!gameSpecifications.copyWrite) {
      error = true;
      gameSpecificationsError.copyWrite = 'CopyWrite is required';
      error = true;
    } else {
      gameSpecificationsError.copyWrite = '';
    }
    if (!gameSpecifications.policy) {
      error = true;
      gameSpecificationsError.policy = 'Policy is required';
    } else {
      gameSpecificationsError.policy = '';
    }

    return error;
  };

  const handleUnnecessaryRemove = () => {
    gameSpecifications.spec = gameSpecifications.spec.filter(spec => spec.isActive);
    gameSpecifications.spec = gameSpecifications.spec.map(spec => {
      const newSpec = { ...spec };
      delete newSpec.isActive;
      return newSpec;
    });
  };

  return { checkValidation, handleUnnecessaryRemove };
}
