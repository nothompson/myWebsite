class Mold {
    constructor() {
      // Mold variables
      this.x = random(width / 2);
      this.y = random(height / 2);

      this.red = random(255);
      this.green = random(255);
      this.blue = random(255);
      // this.x = random(width/2 - 20, width/2 + 20);
      // this.y = random(height/2 - 20, height/2 + 20); 
      this.r = 2;
      
      this.heading = random(360);
      this.vx = cos(this.heading) * 2;
      this.vy = sin(this.heading) * 2;
      this.rotAngle = 45;
      this.stop = false // Boolean variable to stop molds from moving 
      
      // Sensor variables
      this.rSensorPos = createVector(0, 0);
      this.lSensorPos = createVector(0, 0);
      this.fSensorPos = createVector(0, 0);
      this.sensorAngle = 45;
      this.sensorDist = 10;
      
    }

    update(neighbors) {   
      // Using this.stop to control when molds stop moving
        this.vx = cos(this.heading);
        this.vy = sin(this.heading);
      
      let avgHeading = 0;
      let count = 0;
  
      for (let neighbor of neighbors) {
          if (neighbor.userData !== this) {  // ✅ Avoid self-checking
              let d = dist(this.x, this.y, neighbor.x, neighbor.y);
              
              if (d < this.sensorDist) {  
                  avgHeading += neighbor.userData.heading;  
                  count++;
              }
          }
      }
  

      if (count > 0) {
          avgHeading /= count;  
          this.heading = lerp(this.heading, avgHeading, 0.05);  
      }

      // Using % Modulo expression to wrap around the canvas
      this.x = (this.x + this.vx);
      this.y = (this.y + this.vy);
      
      // Get 3 sensor positions based on current position and heading
      this.getSensorPos(this.rSensorPos, this.heading + this.sensorAngle);
      this.getSensorPos(this.lSensorPos, this.heading - this.sensorAngle);
      this.getSensorPos(this.fSensorPos, this.heading);
    
      // Get indices of the 3 sensor positions and get the color values from those indices
      let index, l, r, f;
      index = 4*(d * floor(this.rSensorPos.y)) * (d * width) + 4*(d * floor(this.rSensorPos.x));
      r = pixels[index];
      
      index = 4*(d * floor(this.lSensorPos.y)) * (d * width) + 4*(d * floor(this.lSensorPos.x));
      l = pixels[index];
      
      index = 4*(d * floor(this.fSensorPos.y)) * (d * width) + 4*(d * floor(this.fSensorPos.x));
      f = pixels[index];  
      
      // Compare values of f, l, and r to determine movement 
      if (f > l && f > r) {
        this.heading += 0;
      } else if (f < l && f < r) {
        if (random(1) < 0.5) {
          this.heading += this.rotAngle;
        } else {
          this.heading -= this.rotAngle;
        }
      } else if (l > r) {
        this.heading += -this.rotAngle;
      } else if (r > l) {
        this.heading += this.rotAngle;
      }
      
      if (this.x < 0.1) {
        this.x = 0.1;
        this.heading = this.heading + 180 + (180 * (random(1) * 0.5 - 0.25));
      }
      if (this.x > (width / 2)) {
        this.x = width / 2;
        this.heading = this.heading + 180 + (180 * (random(1) * 0.5 - 0.25));
      }
      if (this.y < 0.1) {
        this.y = 0.1;
        this.heading = this.heading + 180 + (180 * (random(1) * 0.5 - 0.25));
      }
      if (this.y > height / 2) {
        this.y = height / 2;
        this.heading = this.heading + 180 + (180 * (random(1) * 0.5 - 0.25));
      }
      
    }
    
    display() {
      noStroke();
      fill(this.red, this.green, this.blue);
      ellipse(this.x * 2, this.y * 2, this.r, this.r);
      
      // line(this.x, this.y, this.x + this.r*3*this.vx, this.y + this.r*3*this.vy);
      // fill(255, 0, 0);
      // ellipse(this.rSensorPos.x, this.rSensorPos.y, this.r*2, this.r*2);
      // ellipse(this.lSensorPos.x, this.lSensorPos.y, this.r*2, this.r*2);
      // ellipse(this.fSensorPos.x, this.fSensorPos.y, this.r*2, this.r*2);
      
    }
    
    getSensorPos(sensor, angle) {
      sensor.x = (this.x + this.sensorDist*cos(angle) + width) % width;
      sensor.y = (this.y + this.sensorDist*sin(angle) + height) % height;
    }
  
  }