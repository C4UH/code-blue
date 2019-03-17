import {Injectable} from '@angular/core';

const mockReportText = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porttitor lacus luctus accumsan tortor. Enim praesent elementum facilisis leo vel fringilla est. Ipsum consequat nisl vel pretium lectus quam id. Adipiscing enim eu turpis egestas. Cras ornare arcu dui vivamus arcu felis bibendum ut tristique. Molestie nunc non blandit massa enim. Imperdiet nulla malesuada pellentesque elit eget gravida cum. Ullamcorper malesuada proin libero nunc consequat. Diam maecenas ultricies mi eget mauris pharetra et. Penatibus et magnis dis parturient montes nascetur ridiculus. Ut enim blandit volutpat maecenas volutpat blandit aliquam. Placerat orci nulla pellentesque dignissim enim sit amet venenatis urna. Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam. Dolor sit amet consectetur adipiscing elit ut aliquam purus sit. Auctor urna nunc id cursus metus aliquam eleifend. Rhoncus mattis rhoncus urna neque. Massa ultricies mi quis hendrerit dolor magna eget.

Tellus orci ac auctor augue. Vitae sapien pellentesque habitant morbi tristique senectus et. Aliquet sagittis id consectetur purus ut faucibus. Sit amet tellus cras adipiscing enim eu. Lorem dolor sed viverra ipsum nunc. Molestie at elementum eu facilisis sed odio morbi quis commodo. Amet cursus sit amet dictum sit amet justo. Nunc pulvinar sapien et ligula. Ipsum nunc aliquet bibendum enim facilisis gravida neque. Sed enim ut sem viverra aliquet eget sit amet. Nec feugiat nisl pretium fusce id. Felis bibendum ut tristique et egestas quis ipsum suspendisse. Consequat ac felis donec et odio.

Dictum at tempor commodo ullamcorper a lacus. Sit amet nisl suscipit adipiscing bibendum est. Quis viverra nibh cras pulvinar mattis nunc sed. Sagittis orci a scelerisque purus semper eget. Nibh tortor id aliquet lectus proin nibh. Arcu dui vivamus arcu felis bibendum. Pretium viverra suspendisse potenti nullam ac tortor vitae purus. Aliquam faucibus purus in massa tempor nec feugiat nisl pretium. Praesent semper feugiat nibh sed. Imperdiet massa tincidunt nunc pulvinar sapien. Ante metus dictum at tempor. At urna condimentum mattis pellentesque id nibh tortor. Ultricies leo integer malesuada nunc vel. Phasellus vestibulum lorem sed risus ultricies tristique nulla. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim.

Risus at ultrices mi tempus imperdiet nulla malesuada. Vitae justo eget magna fermentum iaculis. Adipiscing tristique risus nec feugiat in fermentum posuere urna. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Est ullamcorper eget nulla facilisi etiam. Fermentum dui faucibus in ornare quam viverra. Suspendisse sed nisi lacus sed viverra tellus in. Enim tortor at auctor urna. Vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt. Vel turpis nunc eget lorem dolor sed viverra ipsum.

Placerat orci nulla pellentesque dignissim enim sit. Vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt. Turpis egestas sed tempus urna et pharetra. Adipiscing elit duis tristique sollicitudin. Adipiscing diam donec adipiscing tristique. Adipiscing tristique risus nec feugiat. Sed nisi lacus sed viverra tellus in hac habitasse. Aliquam purus sit amet luctus venenatis lectus. Egestas sed tempus urna et pharetra pharetra massa massa ultricies. Nibh mauris cursus mattis molestie."
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porttitor lacus luctus accumsan tortor. Enim praesent elementum facilisis leo vel fringilla est. Ipsum consequat nisl vel pretium lectus quam id. Adipiscing enim eu turpis egestas. Cras ornare arcu dui vivamus arcu felis bibendum ut tristique. Molestie nunc non blandit massa enim. Imperdiet nulla malesuada pellentesque elit eget gravida cum. Ullamcorper malesuada proin libero nunc consequat. Diam maecenas ultricies mi eget mauris pharetra et. Penatibus et magnis dis parturient montes nascetur ridiculus. Ut enim blandit volutpat maecenas volutpat blandit aliquam. Placerat orci nulla pellentesque dignissim enim sit amet venenatis urna. Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam. Dolor sit amet consectetur adipiscing elit ut aliquam purus sit. Auctor urna nunc id cursus metus aliquam eleifend. Rhoncus mattis rhoncus urna neque. Massa ultricies mi quis hendrerit dolor magna eget.

Tellus orci ac auctor augue. Vitae sapien pellentesque habitant morbi tristique senectus et. Aliquet sagittis id consectetur purus ut faucibus. Sit amet tellus cras adipiscing enim eu. Lorem dolor sed viverra ipsum nunc. Molestie at elementum eu facilisis sed odio morbi quis commodo. Amet cursus sit amet dictum sit amet justo. Nunc pulvinar sapien et ligula. Ipsum nunc aliquet bibendum enim facilisis gravida neque. Sed enim ut sem viverra aliquet eget sit amet. Nec feugiat nisl pretium fusce id. Felis bibendum ut tristique et egestas quis ipsum suspendisse. Consequat ac felis donec et odio.`;

@Injectable()
export class FhirService {
  /**
   * Given a patient ID, return a promise which resolves to an object containing the PDMP report.
   */
  getPDMP(patientId: string): Promise<any> {
    // TODO: INTEGRATE SMART ON FHIR CLIENT LIBRARY HERE
    // This is a mocked response.
    return Promise.resolve({
      reportText: `Dummy PDMP report data for ID ${patientId}. ${mockReportText}`
    });
  }
}

