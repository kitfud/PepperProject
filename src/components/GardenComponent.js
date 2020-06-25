import React, { Component } from 'react';
import { Media } from 'reactstrap';

class Garden extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kitsgarden: [
                {
                  id: 0,
                  name:'Bulgarian Carrot',
                  image: 'assets/images/bulgariancarrot.jpg',
                  category: 'hot',
                  label:'Hot',
                  scoville:'20,000',
                  description:'heirloom variety which is crunchy and nice on the BBQ'                        },
               {
                  id: 1,
                  name:'Peach Ghost',
                  image: 'assets/images/peachghost.jpg',
                  category: 'super hot',
                  label:'',
                  scoville:'1,000,000',
                  description:'From northeast India and will ripen to a nice peach color!'                        },
               {
                  id: 2,
                  name:'Death Spiral',
                  image: 'assets/images/deathspiral.jpg',
                  category: 'super hot',
                  label:'New',
                  scoville:'1,300,000',
                  description:'Bred in the UK and changes between 5 colors as it ripens'                        },
               {
                  id: 3,
                  name:'Carolina Reaper',
                  image: 'assets/images/carolinareaper.jpg',
                  category: 'super hot',
                  label:'',
                  scoville:'1,500,000',
                  description:'Currently the hottest pepper in the world'                        },
                  {
                    id: 3,
                    name:'Scotch Bonnet',
                    image: 'assets/images/scotchbonnet.jpg',
                    category: 'super hot',
                    label:'',
                    scoville:'80,000',
                    description:'From the Caribbean and the hotness can vary greatly'                        },
                    {
                        id: 3,
                        name:'MA Wartyx',
                        image: 'assets/images/mawartyx.jpg',
                        category: 'super hot',
                        label:'',
                        scoville:'1,200,000',
                        description:'A superhot with bumpy, warty fruits!'                        }
               ],
        };
    }

    render() {
        const garden = this.state.kitsgarden.map((pepper) => {
            return (
              <div key={pepper.id} className="col-12 mt-5">
                <Media tag="li">
                  <Media left middle>
                      <Media object src={pepper.image} alt={pepper.name} />
                  </Media>
                  <Media body className="ml-5">
                    <Media heading>{pepper.name}</Media>
                    <p>{pepper.description}</p>
                  </Media>
                </Media>
              </div>
            );
        });

        return (
          <div className="container">
            <div className="row">
              <Media list>
                  {garden}
              </Media>
            </div>
          </div>
        );
    }
}

export default Garden;